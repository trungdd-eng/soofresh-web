"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { getSite } from "@/content/site";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { useShop } from "@/lib/shop-state";
import { JakartaClock } from "./jakarta-clock";
import { LeafMark } from "./leaf-mark";

const links = [
  ["home", "/"],
  ["farm", "/farm"],
  ["lab", "/lab"],
  ["harvest", "/harvest"],
  ["journals", "/journals"],
  ["products", "/products"],
  ["careers", "/careers"],
  ["faq", "/faq"],
  ["contact", "/contact"],
] as const;

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const overlay = pathname === "/";
  const router = useRouter();
  const { customer, cartCount } = useShop();
  const site = getSite(locale);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [compact, setCompact] = useState(false);
  const [newsletter, setNewsletter] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setCompact(y > 48);
      setHidden(overlay && y > last && y > 180);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = !overlay || compact || open;
  const headline = site.journals[0];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition duration-300 ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${solid ? "bg-paper/95 text-ink shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur" : "bg-transparent text-ink"}`}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-4 px-4 md:h-20 md:px-10">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center"
            aria-label={t("nav.menu")}
            onClick={() => setOpen(true)}
          >
            <span className="flex flex-col gap-1.5">
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
            </span>
          </button>
          <Link href="/" className="text-current" aria-label="SooFresh">
            <LeafMark />
          </Link>
          <div className="ml-auto flex items-center gap-3 md:gap-5">
            <JakartaClock className="hidden text-[11px] tracking-wide opacity-80 sm:block" />
            <Link href="/basket" className="text-sm">
              {t("nav.basket")}
              {cartCount > 0 ? ` (${cartCount})` : ""}
            </Link>
            <Link
              href={customer ? "/account" : "/sign-in"}
              className={`px-3 py-2 text-sm ${solid ? "bg-brand text-white" : "bg-brand text-white"}`}
            >
              {customer ? t("nav.account") : t("nav.signIn")}
            </Link>
          </div>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-50 bg-paper text-ink">
          <div className="mx-auto flex h-full max-w-[1440px] flex-col px-5 py-5 md:px-12">
            <div className="flex items-center justify-between">
              <LeafMark />
              <button type="button" className="text-sm" onClick={() => setOpen(false)}>
                {t("nav.close")}
              </button>
            </div>
            <div className="grid flex-1 gap-10 overflow-auto py-10 md:grid-cols-[1fr_1.2fr]">
              <Link
                href={`/journals/${headline.slug}`}
                onClick={() => setOpen(false)}
                className="block max-w-sm"
              >
                <p className="text-xs tracking-[0.18em] text-brand uppercase">
                  {t("nav.newUpdate")}
                </p>
                <img
                  src={headline.image}
                  alt=""
                  className="mt-4 aspect-[4/3] w-full object-cover"
                />
                <p className="mt-3 text-xs text-muted">{headline.category}</p>
                <p className="mt-1 text-2xl leading-snug">{headline.title}</p>
              </Link>
              <nav className="flex flex-col">
                {links.map(([key, href]) => (
                  <Link
                    key={key}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`border-b border-line py-3 text-3xl tracking-tight transition hover:text-brand md:text-4xl ${
                      pathname === href ? "text-brand" : ""
                    }`}
                  >
                    {t(`menu.${key}`)}
                  </Link>
                ))}
                {customer ? (
                  <>
                    <Link
                      href="/account"
                      onClick={() => setOpen(false)}
                      className="border-b border-line py-3 text-3xl tracking-tight md:text-4xl"
                    >
                      {t("nav.account")}
                    </Link>
                    <Link
                      href="/basket"
                      onClick={() => setOpen(false)}
                      className="border-b border-line py-3 text-3xl tracking-tight md:text-4xl"
                    >
                      {t("nav.basket")}
                      {cartCount > 0 ? ` (${cartCount})` : ""}
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/sign-in"
                    onClick={() => setOpen(false)}
                    className="mt-6 inline-flex w-fit bg-brand px-4 py-2.5 text-sm text-white"
                  >
                    {t("nav.signIn")}
                  </Link>
                )}
                <div className="mt-8 flex gap-3 text-sm">
                  <span className="text-muted">{t("nav.language")}</span>
                  {routing.locales.map((code) => (
                    <button
                      key={code}
                      type="button"
                      className={code === locale ? "text-brand" : ""}
                      onClick={() => {
                        router.replace(pathname, { locale: code });
                        setOpen(false);
                      }}
                    >
                      {code.toUpperCase()}
                    </button>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </div>
      ) : null}

      <main>{children}</main>

      <footer className="bg-paper">
        <div className="bg-moss text-white">
          <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-16 md:grid-cols-[1.2fr_1fr] md:px-16">
            <div>
              <h2 className="max-w-md text-3xl leading-tight font-medium md:text-4xl">
                {t("home.socialTitle")}
              </h2>
              <div className="mt-8 grid grid-cols-3 gap-2">
                {[site.images.flower, site.images.harvest, site.images.aisle].map((src) => (
                  <img key={src} src={src} alt="" className="aspect-square object-cover" />
                ))}
              </div>
            </div>
            <form
              className="self-end"
              onSubmit={(event) => {
                event.preventDefault();
                if (!newsletter.includes("@")) return;
                const key = "soofresh-newsletter";
                const current = JSON.parse(localStorage.getItem(key) ?? "[]") as string[];
                localStorage.setItem(key, JSON.stringify([...current, newsletter]));
                setSubscribed(true);
              }}
            >
              <p className="text-xs tracking-[0.18em] uppercase opacity-70">
                {t("footer.newsletterTitle")}
              </p>
              <p className="mt-3 max-w-sm text-sm text-white/80">{t("footer.newsletterBody")}</p>
              {subscribed ? (
                <p className="mt-4 text-sm">{t("footer.subscribed")}</p>
              ) : (
                <div className="mt-4 flex max-w-md border-b border-white/40">
                  <input
                    type="email"
                    required
                    value={newsletter}
                    onChange={(event) => setNewsletter(event.target.value)}
                    placeholder={t("footer.email")}
                    className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-white/50"
                  />
                  <button type="submit" className="text-sm">
                    {t("footer.subscribe")}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-12 md:grid-cols-4 md:px-16">
          <div>
            <p className="text-xs tracking-[0.18em] text-muted uppercase">{t("footer.explore")}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {links.slice(0, 6).map(([key, href]) => (
                <li key={key}>
                  <Link href={href}>{t(`menu.${key}`)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs tracking-[0.18em] text-muted uppercase">{t("footer.company")}</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/careers">{t("menu.careers")}</Link>
              </li>
              <li>
                <Link href="/contact">{t("menu.contact")}</Link>
              </li>
              <li>
                <Link href="/faq">{t("menu.faq")}</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs tracking-[0.18em] text-muted uppercase">{t("footer.legal")}</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/legal/terms">{t("footer.terms")}</Link>
              </li>
              <li>
                <Link href="/legal/privacy">{t("footer.privacy")}</Link>
              </li>
              <li>
                <Link href="/legal/sale">{t("footer.sale")}</Link>
              </li>
            </ul>
          </div>
          <div className="flex items-end gap-6">
            {site.partners.map((partner) => (
              <img
                key={partner.name}
                src={partner.image}
                alt={partner.name}
                className="h-8 w-auto object-contain"
              />
            ))}
          </div>
        </div>
        <p className="overflow-hidden px-4 pb-6 text-center text-[18vw] leading-none font-medium tracking-tight text-brand md:text-[12rem]">
          Soofresh
        </p>
        <p className="px-5 pb-8 text-center text-xs text-muted">{t("footer.rights")}</p>
      </footer>
    </>
  );
}
