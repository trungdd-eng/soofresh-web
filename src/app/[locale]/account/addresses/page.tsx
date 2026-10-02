import { setRequestLocale } from "next-intl/server";
import { AccountFrame, AddressesView } from "@/components/account-views";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <AccountFrame>
      <AddressesView />
    </AccountFrame>
  );
}
