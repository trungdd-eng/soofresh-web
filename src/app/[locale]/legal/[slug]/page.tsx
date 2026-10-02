import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getSite } from "@/content/site";

const slugs = ["privacy", "terms", "sale"] as const;

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  if (!slugs.includes(slug as (typeof slugs)[number])) notFound();
  const document = getSite(locale).legal[slug as (typeof slugs)[number]];

  return (
    <article className="mx-auto max-w-3xl px-5 pt-28 pb-20 md:pt-36">
      <p className="text-sm text-muted">{document.updated}</p>
      <h1 className="mt-3 text-4xl font-medium md:text-6xl">{document.title}</h1>
      {document.sections.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="text-2xl">{section.heading}</h2>
          <p className="mt-3 leading-relaxed text-muted">{section.body}</p>
        </section>
      ))}
    </article>
  );
}
