import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { ContactView } from "@/components/content-views";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Suspense>
      <ContactView />
    </Suspense>
  );
}
