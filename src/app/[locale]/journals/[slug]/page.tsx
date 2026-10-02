import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { JournalDetailView } from "@/components/content-views";
import { getSite } from "@/content/site";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  if (!getSite(locale).journals.some((journal) => journal.slug === slug)) notFound();
  return <JournalDetailView slug={slug} />;
}
