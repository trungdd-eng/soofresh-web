import { setRequestLocale } from "next-intl/server";
import { BasketView } from "@/components/basket-view";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BasketView locale={locale} />;
}
