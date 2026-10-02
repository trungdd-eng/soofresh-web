import { setRequestLocale } from "next-intl/server";
import { SuccessView } from "@/components/checkout-view";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SuccessView />;
}