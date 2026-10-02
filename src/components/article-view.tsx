"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import type { ArticleSection } from "@/content/site";

export function ArticleView({
  kicker,
  title,
  lede,
  cta,
  ctaHref,
  image,
  sections,
}: {
  kicker: string;
  title: string;
  lede: string;
  cta: string;
  ctaHref: string;
  image: string;
  sections: ArticleSection[];
}) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const nodes = sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0.2, 0.6] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <article>
      <header className="relative min-h-[70svh] text-white">
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative mx-auto flex min-h-[70svh] max-w-[1440px] flex-col justify-end px-5 pt-32 pb-12 md:px-16">
          <p className="text-xs tracking-[0.18em] uppercase">{kicker}</p>
          <h1 className="mt-3 max-w-3xl text-4xl leading-tight font-medium md:text-6xl">{title}</h1>
          <p className="mt-4 max-w-xl text-white/85">{lede}</p>
        </div>
      </header>
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-[1fr_240px] md:px-16">
        <div className="space-y-16">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <h2 className="text-3xl font-medium">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 max-w-2xl leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
              {section.image ? (
                <img
                  src={section.image}
                  alt={section.imageAlt ?? ""}
                  className="mt-6 aspect-[16/9] w-full object-cover"
                />
              ) : null}
            </section>
          ))}
          <Link href={ctaHref} className="inline-flex bg-brand px-4 py-3 text-sm text-white">
            {cta} →
          </Link>
        </div>
        <aside className="hidden md:block">
          <nav className="sticky top-28 space-y-3 text-sm">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`block border-l pl-3 ${
                  active === section.id ? "border-brand text-ink" : "border-line text-muted"
                }`}
              >
                {section.title}
              </a>
            ))}
          </nav>
        </aside>
      </div>
    </article>
  );
}
