import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { AccountFrame, OrderDetailView } from "@/components/account-views";
import { getSite } from "@/content/site";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; number: string }>;
}) {
  const { locale, number } = await params;
  setRequestLocale(locale);
  const decoded = decodeURIComponent(number);
  if (!getSite(locale).orders.some((order) => order.number === decoded)) notFound();
  return (
    <AccountFrame>
      <OrderDetailView number={decoded} />
    </AccountFrame>
  );
}
