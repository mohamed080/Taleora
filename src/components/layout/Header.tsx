"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { navLinks } from "@/data/homeData";
import Image from "next/image";
import { RiGlobalFill } from "react-icons/ri";

export function Header() {
  const t = useTranslations("header");
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = locale === "ar" ? "en" : "ar";
  console.log(locale)

  // Keep the same path while swapping the locale prefix (e.g. /en/books -> /ar/books)
  const localePath = pathname?.replace(`/${locale}`, "") || "";
  const switchHref = `/${otherLocale}${localePath}`;

  return (
    <header className="sticky top-0 z-20 border-b border-orange-100 bg-white backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        <div>
          <Image 
            src="/images/logo.svg"
            alt="Logo"
            width={112}
            height={40}
            />
        </div>
        <nav className="hidden gap-6 text-sm lg:text-base  md:flex font-medium">
          {navLinks.map((item) => (
            <a key={item} href={`/${locale}/${item}`} className={pathname.startsWith(`/${locale}${item === "home" ? "" : item}`) ? "text-primary" : "text-secondary hover:text-primary"}>
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
            <RiGlobalFill className="ml-2" />
          </Link>
          <button className="rounded-full bg-rose-400 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-500">
            {t("join")}
          </button>
        </div>
      </div>
    </header>
  );
}
