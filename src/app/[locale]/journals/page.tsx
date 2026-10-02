import { setRequestLocale } from "next-intl/server";
import { JournalsView } from "@/components/content-views";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <JournalsView />;
}
