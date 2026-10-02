import { setRequestLocale } from "next-intl/server";
import { VerifyView } from "@/components/auth-views";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <VerifyView />;
}
