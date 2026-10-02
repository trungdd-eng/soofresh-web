"use client";

import { useLocale } from "next-intl";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { getSite } from "@/content/site";
import { Link } from "@/i18n/navigation";

export function JournalsView() {
  const locale = useLocale();
  const site = getSite(locale);
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(site.journals.map((journal) => journal.category))];
  const visible =
    filter === "All" ? site.journals : site.journals.filter((journal) => journal.category === filter);
  const headline = site.journals[0];

  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-28 pb-20 md:px-16 md:pt-36">
      <p className="text-xs tracking-[0.18em] text-brand uppercase">
        {locale === "en" ? "Journals" : "Jurnal"}
      </p>
      <Link href={`/journals/${headline.slug}`} className="mt-6 grid gap-6 md:grid-cols-2">
        <img src={headline.image} alt="" className="aspect-[4/3] w-full object-cover" />
        <div className="self-end">
          <p className="text-sm text-muted">{headline.category}</p>
          <h1 className="mt-2 text-4xl font-medium md:text-5xl">{headline.title}</h1>
          <p className="mt-4 text-muted">{headline.excerpt}</p>
        </div>
      </Link>
      <div className="mt-12 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            className={`border px-3 py-1.5 text-sm ${filter === category ? "border-ink bg-ink text-white" : "border-line"}`}
          >
            {category === "All" ? (locale === "en" ? "All" : "Semua") : category}
          </button>
        ))}
      </div>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((journal) => (
          <li key={journal.slug}>
            <Link href={`/journals/${journal.slug}`}>
              <img src={journal.image} alt="" className="aspect-[4/3] w-full object-cover" />
              <p className="mt-3 text-xs text-muted">{journal.category}</p>
              <h2 className="mt-1 text-xl">{journal.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function JournalDetailView({ slug }: { slug: string }) {
  const journal = getSite(useLocale()).journals.find((item) => item.slug === slug);
  if (!journal) return null;
  return (
    <article className="mx-auto max-w-3xl px-5 pt-28 pb-20 md:pt-36">
      <p className="text-xs tracking-[0.18em] text-brand uppercase">{journal.category}</p>
      <h1 className="mt-3 text-4xl font-medium md:text-6xl">{journal.title}</h1>
      <p className="mt-3 text-sm text-muted">{journal.date}</p>
      <img src={journal.image} alt="" className="mt-8 aspect-[16/9] w-full object-cover" />
      {journal.body.map((paragraph) => (
        <p key={paragraph} className="mt-6 leading-relaxed text-muted">
          {paragraph}
        </p>
      ))}
    </article>
  );
}

export function ContactView() {
  const locale = useLocale();
  const params = useSearchParams();
  const site = getSite(locale);
  const initial = params.get("to") ?? "general";
  const [sent, setSent] = useState(false);
  const [target, setTarget] = useState(
    site.contactTargets.some((item) => item.value === initial) ? initial : "general",
  );
  const labels =
    locale === "en"
      ? { title: "Contact", name: "Name", email: "Email", phone: "Phone", to: "Contact to", message: "Message", send: "Send", done: "Message received. We will write back." }
      : { title: "Kontak", name: "Nama", email: "Email", phone: "Telepon", to: "Kontak ke", message: "Pesan", send: "Kirim", done: "Pesan diterima. Kami akan membalas." };

  if (sent) {
    return (
      <div className="mx-auto max-w-xl px-5 pt-36">
        <h1 className="text-4xl font-medium">{labels.title}</h1>
        <p className="mt-4">{labels.done}</p>
      </div>
    );
  }

  return (
    <form
      className="mx-auto grid max-w-[1440px] gap-10 px-5 pt-28 pb-20 md:grid-cols-2 md:px-16 md:pt-36"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <div>
        <h1 className="text-4xl font-medium md:text-6xl">{labels.title}</h1>
        <img src="/images/figma/hero-clean.jpg" alt="" className="mt-8 hidden aspect-[4/3] object-cover md:block" />
      </div>
      <div className="space-y-3">
        <input required name="name" placeholder={labels.name} className="w-full border border-line bg-white px-3 py-3" />
        <input required type="email" name="email" placeholder={labels.email} className="w-full border border-line bg-white px-3 py-3" />
        <input required name="phone" placeholder={labels.phone} className="w-full border border-line bg-white px-3 py-3" />
        <label className="block text-sm text-muted">
          {labels.to}
          <select
            value={target}
            onChange={(event) => setTarget(event.target.value)}
            className="mt-1 w-full border border-line bg-white px-3 py-3 text-ink"
          >
            {site.contactTargets.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <textarea required name="message" placeholder={labels.message} className="min-h-32 w-full border border-line bg-white px-3 py-3" />
        <button type="submit" className="bg-brand px-4 py-3 text-sm text-white">
          {labels.send}
        </button>
      </div>
    </form>
  );
}

export function FaqView() {
  const locale = useLocale();
  const faqs = getSite(locale).faqs;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl px-5 pt-28 pb-20 md:pt-36">
      <h1 className="text-4xl font-medium">FAQ</h1>
      <ul className="mt-8 divide-y divide-line border-y border-line">
        {faqs.map((item, index) => (
          <li key={item.q}>
            <button
              type="button"
              className="flex w-full items-center justify-between py-4 text-left"
              aria-expanded={open === index}
              onClick={() => setOpen(open === index ? null : index)}
            >
              {item.q}
              <span>{open === index ? "–" : "+"}</span>
            </button>
            {open === index ? <p className="pb-4 text-sm leading-relaxed text-muted">{item.a}</p> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CareersView() {
  const locale = useLocale();
  const site = getSite(locale);
  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-28 pb-20 md:px-16 md:pt-36">
      <h1 className="max-w-3xl text-4xl font-medium md:text-6xl">
        {locale === "en" ? "Work inside the room" : "Bekerja di dalam ruangan"}
      </h1>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {site.departments.map((department) => (
          <div key={department.name} className="border border-line bg-white p-5">
            <h2 className="text-xl">{department.name}</h2>
            <p className="mt-2 text-sm text-muted">{department.body}</p>
          </div>
        ))}
      </div>
      <h2 className="mt-16 text-2xl">{locale === "en" ? "Open roles" : "Lowongan"}</h2>
      <ul className="mt-4 divide-y divide-line">
        {site.roles.map((role) => (
          <li key={role.slug}>
            <Link href={`/careers/${role.slug}`} className="flex flex-wrap items-baseline justify-between gap-3 py-4">
              <span className="text-xl">{role.title}</span>
              <span className="text-sm text-muted">
                {role.department} · {role.location} · {role.type}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <h2 className="mt-16 text-2xl">{locale === "en" ? "Benefits" : "Manfaat"}</h2>
      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {site.benefits.map((benefit) => (
          <li key={benefit} className="bg-white p-4 text-sm">
            {benefit}
          </li>
        ))}
      </ul>
      <h2 className="mt-16 text-2xl">{locale === "en" ? "People inside SooFresh" : "Orang di dalam SooFresh"}</h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-3">
        {site.people.map((person) => (
          <li key={person.name}>
            <img src={person.image} alt="" className="aspect-[4/5] w-full object-cover" />
            <p className="mt-2">{person.name}</p>
            <p className="text-sm text-muted">{person.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RoleView({ slug }: { slug: string }) {
  const locale = useLocale();
  const role = getSite(locale).roles.find((item) => item.slug === slug);
  const [sent, setSent] = useState(false);
  if (!role) return null;
  const labels =
    locale === "en"
      ? { req: "Requirements", qual: "Qualifications", apply: "Apply", done: "Application received." }
      : { req: "Persyaratan", qual: "Kualifikasi", apply: "Lamar", done: "Lamaran diterima." };

  return (
    <div className="mx-auto grid max-w-[1440px] gap-12 px-5 pt-28 pb-20 md:grid-cols-2 md:px-16 md:pt-36">
      <div>
        <p className="text-xs tracking-[0.18em] text-brand uppercase">{role.department}</p>
        <h1 className="mt-3 text-4xl font-medium">{role.title}</h1>
        <p className="mt-2 text-sm text-muted">
          {role.location} · {role.type}
        </p>
        <p className="mt-6 leading-relaxed">{role.summary}</p>
        <h2 className="mt-8 text-lg">{labels.req}</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-muted">
          {role.requirements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h2 className="mt-6 text-lg">{labels.qual}</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-muted">
          {role.qualifications.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      {sent ? (
        <p className="text-lg">{labels.done}</p>
      ) : (
        <form
          className="space-y-3"
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
        >
          <h2 className="text-2xl">{labels.apply}</h2>
          <input required placeholder={locale === "en" ? "Name" : "Nama"} className="w-full border border-line bg-white px-3 py-3" />
          <input required type="email" placeholder="Email" className="w-full border border-line bg-white px-3 py-3" />
          <input required placeholder={locale === "en" ? "Phone" : "Telepon"} className="w-full border border-line bg-white px-3 py-3" />
          <input placeholder={locale === "en" ? "Portfolio or LinkedIn" : "Portofolio atau LinkedIn"} className="w-full border border-line bg-white px-3 py-3" />
          <label className="block text-sm text-muted">
            CV
            <input required type="file" accept=".pdf,.doc,.docx" className="mt-1 block w-full text-ink" />
          </label>
          <button type="submit" className="bg-brand px-4 py-3 text-sm text-white">
            {labels.apply}
          </button>
        </form>
      )}
    </div>
  );
}
