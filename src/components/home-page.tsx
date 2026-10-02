"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { getSite } from "@/content/site";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { jakartaHour } from "./jakarta-clock";

function HexagonBand() {
  return (
    <div className="overflow-hidden py-8" aria-hidden="true">
      <div className="hex-track flex w-[200%] gap-3">
        {Array.from({ length: 28 }).map((_, index) => (
          <svg key={index} viewBox="0 0 40 46" className="h-10 w-9 shrink-0 text-brand/40">
            <path
              d="M20 1.5 38 11.5v20L20 41.5 2 31.5v-20L20 1.5Z"
              fill="none"
              stroke="currentColor"
            />
          </svg>
        ))}
      </div>
    </div>
  );
}

export function HomePage() {
  const t = useTranslations("home");
  const locale = useLocale() as Locale;
  const site = getSite(locale);
  const [slide, setSlide] = useState(0);
  const [fill, setFill] = useState(0);
  const prologueRef = useRef<HTMLElement>(null);
  const active = site.techSlides[slide];
  const hour = jakartaHour();
  const sunX = ((hour + 6) % 24) / 24;

  useEffect(() => {
    const onScroll = () => {
      const node = prologueRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const progress = 1 - (rect.top + rect.height * 0.2) / window.innerHeight;
      setFill(Math.min(1, Math.max(0, progress)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      <section className="relative min-h-[100svh] text-white">
        <img
          src={site.images.hero}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/20" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-5 pt-28 pb-10 md:px-16 md:pb-16">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <h1 className="text-5xl leading-none font-medium tracking-tight md:text-7xl">
                {t("heroTitle")}
              </h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/90 md:text-base">
                {t("heroBody")}
              </p>
            </div>
            <Link href="/products" className="inline-flex w-fit bg-brand px-4 py-3 text-sm text-white">
              {t("exploreNow")} →
            </Link>
          </div>
        </div>
      </section>

      <section ref={prologueRef} className="mx-auto max-w-[1440px] px-5 py-24 md:px-16 md:py-36">
        <p
          className="max-w-4xl text-2xl leading-snug font-medium md:text-4xl"
          style={{
            color: "transparent",
            backgroundImage: `linear-gradient(#1c1c1c, #1c1c1c), linear-gradient(#c8c8c8, #c8c8c8)`,
            backgroundSize: `100% ${fill * 100}%, 100% 100%`,
            backgroundRepeat: "no-repeat",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          {t("prologue")}
        </p>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-20 md:px-16">
        <div className="grid items-end gap-8 md:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-xs tracking-[0.18em] text-brand uppercase">{t("techKicker")}</p>
            <h2 className="mt-3 text-4xl leading-tight font-medium tracking-tight md:text-5xl">
              {t("techTitle")}
            </h2>
            <p className="mt-4 max-w-md text-bronze">{t("techBody")}</p>
            <div className="mt-8">
              <div className="relative h-10">
                <svg viewBox="0 0 200 40" className="h-10 w-full text-brand/50">
                  <path d="M0 34 Q 50 34 100 12 T 200 34" fill="none" stroke="currentColor" />
                  <circle cx={12 + sunX * 176} cy={sunX < 0.5 ? 18 : 28} r="4" fill="#84943a" />
                </svg>
                <p className="text-xs text-muted">{t("today")}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {site.techSlides.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSlide(index)}
                    className={`border px-3 py-2 text-sm ${
                      index === slide ? "border-ink bg-ink text-white" : "border-line"
                    }`}
                  >
                    {item.tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <figure>
            <img src={active.image} alt="" className="aspect-[16/10] w-full object-cover" />
            <figcaption className="mt-4">
              <p className="text-xl">{active.title}</p>
              <p className="mt-2 max-w-lg text-sm text-muted">{active.body}</p>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-4 px-5 pb-16 md:grid-cols-3 md:px-16">
        <p className="text-xs tracking-[0.18em] text-brand uppercase md:col-span-3">
          {t("portalsKicker")}
        </p>
        {site.portals.map((portal) => (
          <Link key={portal.href} href={portal.href} className="group bg-white">
            <img src={portal.image} alt="" className="aspect-[4/3] w-full object-cover" />
            <div className="p-5">
              <p className="text-xs tracking-[0.16em] text-muted uppercase">{portal.eyebrow}</p>
              <h3 className="mt-2 text-2xl">{portal.title}</h3>
              <p className="mt-2 text-sm text-muted">{portal.body}</p>
              <p className="mt-4 text-sm text-brand">{portal.cta} →</p>
            </div>
          </Link>
        ))}
      </section>

      <HexagonBand />

      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-[0.8fr_1.2fr] md:px-16">
        <div>
          <p className="text-sm leading-relaxed text-bronze md:text-base">{t("journalsIntro")}</p>
          <Link href="/journals" className="mt-8 inline-flex bg-brand px-4 py-3 text-sm text-white">
            {t("seeJournals")}
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {site.journals.map((journal, index) => (
            <Link key={journal.slug} href={`/journals/${journal.slug}`} className="relative">
              <img src={journal.image} alt="" className="aspect-square w-full object-cover" />
              <span className="absolute top-2 left-2 text-[10px] text-white">
                [{String(index + 1).padStart(2, "0")}]
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] items-stretch gap-0 px-5 py-10 md:grid-cols-2 md:px-16">
        <img src={site.images.storage} alt="" className="h-full min-h-80 w-full object-cover" />
        <div className="flex flex-col justify-center bg-white px-6 py-12 md:px-12">
          <p className="text-xs tracking-[0.18em] text-brand uppercase">{t("partnerKicker")}</p>
          <h2 className="mt-3 text-3xl leading-tight font-medium md:text-5xl">{t("partnerTitle")}</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">{t("partnerBody")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact?to=invest" className="bg-brand px-4 py-3 text-sm text-white">
              {t("invest")}
            </Link>
            <Link href="/contact?to=visit" className="border border-ink/20 px-4 py-3 text-sm">
              {t("visit")} →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 py-16 md:grid-cols-2 md:px-16">
        <div>
          <h2 className="text-3xl leading-tight font-medium md:text-5xl">{t("careersTitle")}</h2>
          <p className="mt-4 max-w-md text-muted">{t("careersBody")}</p>
          <Link href="/careers" className="mt-6 inline-flex bg-brand px-4 py-3 text-sm text-white">
            {t("careersCta")}
          </Link>
        </div>
        <img src={site.images.aisle} alt="" className="aspect-[4/3] w-full object-cover" />
      </section>
    </div>
  );
}
