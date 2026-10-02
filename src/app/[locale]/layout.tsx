import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/site-chrome";
import { routing, type Locale } from "@/i18n/routing";
import { ShopProvider } from "@/lib/shop-state";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale as Locale} messages={messages}>
      <ShopProvider>
        <SiteChrome>{children}</SiteChrome>
      </ShopProvider>
    </NextIntlClientProvider>
  );
}
