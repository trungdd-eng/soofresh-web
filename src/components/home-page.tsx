"use client";

import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { getSite } from "@/content/site";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

function jakartaMinutes(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const minute = Number(
    parts.find((part) => part.type === "minute")?.value ?? "0",
  );
  return hour * 60 + minute;
}

function arcPoint(t: number) {
  const p0 = { x: 48, y: 168 };
  const p1 = { x: 500, y: 18 };
  const p2 = { x: 952, y: 168 };
  const u = 1 - t;
  return {
    x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x,
    y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y,
  };
}

function HexCell() {
  return (
    <svg viewBox="0 0 86 100" className="h-16 w-14 shrink-0 text-[#5d6952]">
      <path
        d="M43 4 80 25.5v43L43 90 6 68.5v-43L43 4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      {[
        [43, 4],
        [80, 25.5],
        [80, 68.5],
        [43, 90],
        [6, 68.5],
        [6, 25.5],
      ].map(([cx, cy]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="2.2"
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

function HexagonBand() {
  return (
    <div className="overflow-hidden py-10" aria-hidden="true">
      <div className="hex-track flex w-[200%]">
        {Array.from({ length: 2 }).map((_, copy) => (
          <div key={copy} className="flex w-1/2 gap-3 px-1">
            {Array.from({ length: 18 }).map((_, index) => (
              <div key={index} className={index % 2 ? "mt-8" : ""}>
                <HexCell />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function FacilityImage({ src, fallback }: { src: string; fallback: string }) {
  const [current, setCurrent] = useState(src);

  return (
    <img
      src={current}
      alt=""
      className="aspect-[4/5] w-full object-cover"
      onError={() => {
        setCurrent((value) => (value === fallback ? value : fallback));
      }}
    />
  );
}

function HeroMedia({ poster }: { poster: string }) {
  return <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />;
}

export function HomePage() {
  const t = useTranslations("home");
  const menu = useTranslations("menu");
  const locale = useLocale() as Locale;
  const site = getSite(locale);
  const prologueRef = useRef<HTMLElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLElement>(null);
  const [fill, setFill] = useState(0);
  const [lightOpacity, setLightOpacity] = useState(0);
  const [techProgress, setTechProgress] = useState(0);
  const [clock, setClock] = useState({ t: 0.5, day: true });

  useEffect(() => {
    const tick = () => {
      const minutes = jakartaMinutes();
      const day = minutes >= 6 * 60 && minutes <= 18 * 60;
      const tPosition = day
        ? (minutes - 6 * 60) / (12 * 60)
        : minutes < 6 * 60
          ? (minutes / (6 * 60)) * 0.08
          : 0.92 + ((minutes - 18 * 60) / (6 * 60)) * 0.08;
      setClock({ t: Math.min(1, Math.max(0, tPosition)), day });
    };
    tick();
    const id = window.setInterval(tick, 30000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const prologue = prologueRef.current;
      const light = lightRef.current;
      const tech = techRef.current;
      if (prologue) {
        const rect = prologue.getBoundingClientRect();
        const start = window.innerHeight * 0.92;
        const end = window.innerHeight * 0.28;
        const value = (start - rect.top) / (start - end);
        setFill(Math.min(1, Math.max(0, value)));
      }
      if (light) {
        const rect = light.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - window.innerHeight * 0.58);
        setLightOpacity(
          1 - Math.min(1, distance / (window.innerHeight * 0.72)),
        );
      }
      if (tech) {
        const rect = tech.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const passed = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
        setTechProgress(total > 0 ? passed / total : 0);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const slides = site.techSlides;
  const slidePosition = techProgress * Math.max(slides.length - 1, 1);
  const activeSlide = Math.round(slidePosition);
  const sun = arcPoint(clock.t);
  const socialImages = [
    site.images.harvest,
    site.images.aisle,
    site.images.flower,
    site.images.vertical,
  ];

  const scrollToSlide = (index: number) => {
    const node = techRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const start = window.scrollY + rect.top;
    const total = node.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: start + (total * index) / Math.max(slides.length - 1, 1),
      behavior: "smooth",
    });
  };

  return (
    <div>
      <section className="relative min-h-[100svh] overflow-hidden text-white">
        <HeroMedia poster={site.images.hero} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/15" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-5 pt-28 pb-10 md:px-16 md:pb-14">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <h1 className="text-5xl leading-none font-medium tracking-tight md:text-7xl">
                {t("heroTitle")}
              </h1>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/90 md:text-base">
                {t("heroBody")}
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex w-fit bg-brand px-4 py-3 text-sm text-white"
            >
              {t("exploreNow")} →
            </Link>
          </div>
        </div>
      </section>

      <section
        ref={prologueRef}
        className="mx-auto max-w-[1440px] px-5 py-20 md:px-16 md:py-28"
      >
        <div className="grid items-center gap-10 md:grid-cols-[1.15fr_0.85fr]">
          <p
            className="text-3xl leading-snug font-medium tracking-tight md:text-[2.65rem] md:leading-[1.25]"
            style={{
              color: "transparent",
              backgroundImage:
                "linear-gradient(#131518, #131518), linear-gradient(#c5c9d2, #c5c9d2)",
              backgroundSize: `100% ${fill * 100}%, 100% 100%`,
              backgroundRepeat: "no-repeat",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            {t("prologue")}
          </p>
          <FacilityImage
            src={site.images.facility}
            fallback={site.images.vertical}
          />
        </div>

        <div
          ref={lightRef}
          className="relative mx-auto mt-16 max-w-4xl transition-opacity duration-300"
          style={{ opacity: 0.25 + lightOpacity * 0.75 }}
        >
          <svg viewBox="0 0 1000 210" className="w-full">
            <path
              d="M48 168 Q 500 18 952 168"
              fill="none"
              stroke="#d5d7de"
              strokeDasharray="2 7"
              strokeLinecap="round"
            />
            <circle
              cx={sun.x}
              cy={sun.y}
              r="28"
              fill={clock.day ? "#f6c453" : "#d7dee8"}
              opacity="0.35"
            />
            <circle
              cx={sun.x}
              cy={sun.y}
              r="14"
              fill={clock.day ? "#f0b429" : "#eef2f6"}
            />
          </svg>
          <div className="mx-auto -mt-6 max-w-xs text-center">
            <p className="text-lg text-brand">{t("lightTitle")}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {t("lightBody")}
            </p>
          </div>
        </div>
      </section>

      <section ref={techRef} className="relative h-[280vh]">
        <div className="sticky top-0 flex h-[100svh] items-center">
          <div className="mx-auto grid w-full max-w-[1440px] items-center gap-8 px-5 md:grid-cols-[1.15fr_0.85fr] md:px-16">
            <div>
              <p className="text-xs tracking-[0.16em] text-brand">
                {t("techKicker")}
              </p>
              <div className="relative mt-4">
                {slides.map((slide, index) => (
                  <img
                    key={slide.id}
                    src={slide.image}
                    alt=""
                    className="aspect-[16/10] w-full object-cover transition-opacity duration-500"
                    style={{
                      opacity: Math.max(
                        0,
                        1 - Math.abs(slidePosition - index) * 1.35,
                      ),
                      position: index === 0 ? "relative" : "absolute",
                      inset: index === 0 ? undefined : 0,
                    }}
                  />
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => scrollToSlide(index)}
                    className={`px-3 py-1.5 text-xs ${
                      index === activeSlide
                        ? "bg-ink text-white"
                        : "bg-white text-muted"
                    }`}
                  >
                    {slide.tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative h-72 md:h-80">
              {slides.map((slide, index) => {
                const distance = slidePosition - index;
                return (
                  <article
                    key={slide.id}
                    className="absolute inset-x-0 top-1/2"
                    style={{
                      opacity: Math.max(0, 1 - Math.abs(distance) * 1.35),
                      transform: `translateY(calc(-50% + ${distance * -72}px))`,
                    }}
                  >
                    <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
                      {slide.title}
                    </h2>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                      {slide.body}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pt-8 pb-6 md:px-16">
        <p className="text-xs tracking-[0.16em] text-brand">
          {t("portalsKicker")}
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {site.portals.map((portal) => (
            <Link
              key={portal.href}
              href={portal.href}
              className="group relative block overflow-hidden"
            >
              <img
                src={portal.image}
                alt=""
                className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                <h3 className="text-2xl text-white">{portal.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <HexagonBand />

      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-[0.8fr_1.2fr] md:px-16">
        <div>
          <h2 className="text-4xl font-medium tracking-tight">
            {menu("journals")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
            {t("journalsIntro")}
          </p>
          <Link
            href="/journals"
            className="mt-8 inline-flex bg-brand px-4 py-3 text-sm text-white"
          >
            {t("seeJournals")}
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {site.journals.map((journal, index) => (
            <Link
              key={journal.slug}
              href={`/journals/${journal.slug}`}
              className="relative"
            >
              <img
                src={journal.image}
                alt=""
                className="aspect-square w-full object-cover"
              />
              <span className="absolute top-2 left-2 text-[10px] text-white">
                [{String(index + 1).padStart(2, "0")}]
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] items-stretch gap-0 px-5 py-10 md:grid-cols-2 md:px-16">
        <div className="relative min-h-[440px]">
          <img
            src={site.images.partner}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-6 bg-white/90 px-4 py-3">
            {site.partners.map((partner) => (
              <img
                key={partner.name}
                src={partner.image}
                alt={partner.name}
                className="h-7 w-auto object-contain"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center bg-white px-6 py-12 md:px-12">
          <h2 className="text-3xl leading-tight font-medium md:text-5xl">
            {t("partnerTitle")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {t("partnerBody")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact?to=invest"
              className="bg-brand px-4 py-3 text-sm text-white"
            >
              {t("invest")}
            </Link>
            <Link
              href="/contact?to=visit"
              className="border border-ink/20 px-4 py-3 text-sm"
            >
              {t("visit")} →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 py-16 md:grid-cols-2 md:px-16">
        <div>
          <h2 className="text-3xl leading-tight font-medium md:text-5xl">
            {t("careersTitle")}
          </h2>
          <p className="mt-4 max-w-md text-muted">{t("careersBody")}</p>
          <Link
            href="/careers"
            className="mt-6 inline-flex bg-brand px-4 py-3 text-sm text-white"
          >
            {t("careersCta")}
          </Link>
        </div>
        <img
          src={site.images.aisle}
          alt=""
          className="aspect-[4/3] w-full object-cover"
        />
      </section>

      <section className="bg-[#1c291c] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-16">
          <h2 className="max-w-xl text-3xl leading-tight font-medium md:text-5xl">
            {t("socialTitle")}
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {socialImages.map((src, index) => (
              <motion.img
                key={src}
                src={src}
                alt=""
                className="aspect-square w-full object-cover"
                initial={{ scale: 0.55, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.45 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ transformOrigin: "center" }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
