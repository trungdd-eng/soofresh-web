import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SooFresh",
    template: "%s · SooFresh",
  },
  description:
    "Strawberries grown at sea level in West Jakarta. A method, not a mountain.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const headerList = await headers();
  const locale = headerList.get("X-NEXT-INTL-LOCALE") ?? "id";

  return (
    <html lang={locale} className={`${geist.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full bg-paper text-ink">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('soofresh-theme');if(t==='night'||t==='day')document.documentElement.dataset.theme=t;}catch(e){}",
          }}
        />
        {children}
      </body>
    </html>
  );
}
