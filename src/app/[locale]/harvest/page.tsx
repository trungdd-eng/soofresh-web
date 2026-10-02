import { setRequestLocale } from "next-intl/server";
import { ArticleView } from "@/components/article-view";
import { getSite } from "@/content/site";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ArticleView {...getSite(locale).articles.harvest} />;
}
