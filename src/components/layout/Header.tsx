"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { navLinks } from "@/data/homeData";
import Image from "next/image";
import { RiGlobalFill } from "react-icons/ri";
import { Button } from "../ui/button";

export function Header() {
  const t = useTranslations("header");
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = locale === "ar" ? "en" : "ar";

  // Keep the same path while swapping the locale prefix (e.g. /en/books -> /ar/books)
  const localePath = pathname?.replace(`/${locale}`, "") || "";
  const switchHref = `/${otherLocale}${localePath}`;

  return (
    <header className="sticky top-0 z-20 border-b border-orange-100 bg-white backdrop-blur">
      <div className="mx-auto flex w-full items-center justify-between px-4 py-4 md:px-12">
        <div>
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={112}
            height={40}
          />
        </div>
        <nav className="hidden gap-6 text-sm lg:text-base md:flex font-medium">
          {navLinks.map((item) => {
            const to = `/${locale}${item === "home" ? "" : `/${item}`}`;
            const isActive = pathname?.startsWith(to);

            return (
              <Link
                key={item}
                href={to}
                className={isActive ? "text-primary" : "text-secondary hover:text-primary"}
              >
                {t(`nav.${item}`)}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2">
            <Button asChild variant="link" size="lg" className="border-0!">   
              <Link href={`/${locale}/login`} >
                {t("login")}
              </Link>
            </Button>

            <Button asChild variant="default" size="lg" className="px-5!">   
              <Link href={`/${locale}/login`} >
                {t("signup")}
              </Link>
            </Button>


          </div>
          <Button asChild variant="link" size="lg" className="">
            <Link href={switchHref}>
              {otherLocale.toUpperCase()}
              <RiGlobalFill  />
            </Link>
          </Button>
         
        </div>
      </div>
    </header>
  );
}
