import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { RoleView } from "@/components/content-views";
import { getSite } from "@/content/site";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  if (!getSite(locale).roles.some((role) => role.slug === slug)) notFound();
  return <RoleView slug={slug} />;
}
