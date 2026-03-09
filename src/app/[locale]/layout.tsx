import type { Metadata } from "next";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import { Footer, Header } from "@/components/landing";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const theSeasons = localFont({
  src: [
    {
      path: "../../../public/fonts/theseasons-lt.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/theseasons-reg.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/theseasons-bd.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-seasons",
});

export const metadata: Metadata = {
  title: "Taleora | Kids Book Landing",
  description: "A playful, component-based Taleora landing page scaffold.",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={`${montserrat.variable} ${theSeasons.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
            {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
