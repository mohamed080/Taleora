"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { navLinks } from "@/data/homeData";

export function Header() {
  const t = useTranslations("header");
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = locale === "ar" ? "en" : "ar";

  // Keep the same path while swapping the locale prefix (e.g. /en/books -> /ar/books)
  const localePath = pathname?.replace(`/${locale}`, "") || "";
  const switchHref = `/${otherLocale}${localePath}`;

  return (
    <header className="sticky top-0 z-20 border-b border-orange-100 bg-[#fff8ec]/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        <div>
          <p className="font-serif text-3xl font-semibold leading-none text-rose-500">{t("brand")}</p>
          <p className="text-xs tracking-[0.2em] text-amber-700">{t("tagline")}</p>
        </div>
        <nav className="hidden gap-6 text-sm text-stone-700 md:flex">
          {navLinks.map((item) => (
            <a key={item} href="#" className="transition hover:text-rose-500">
              {t(`nav.${item}`)}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href={switchHref}
            className="rounded-full border border-rose-200 bg-white/60 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-white"
          >
            {otherLocale.toUpperCase()}
          </Link>
          <button className="rounded-full bg-rose-400 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-500">
            {t("join")}
          </button>
        </div>
      </div>
    </header>
  );
}
