"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { RiGlobalFill } from "react-icons/ri";
import { Button } from "../ui/button";
import { navLinks } from "@/constants/enums";
import { motion, AnimatePresence, Variants } from "framer-motion";

export function Header() {
  const t = useTranslations("header");
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = locale === "ar" ? "en" : "ar";
  const [menuOpen, setMenuOpen] = useState(false);

  const localePath = pathname?.replace(`/${locale}`, "") || "";
  const switchHref = `/${otherLocale}${localePath}`;

  // Framer Motion variants
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] as const },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] as const },
    },
  };

  const linkVariants: Variants = {
    closed: { opacity: 0, x: -16 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.07 + 0.1, duration: 0.3, ease: "easeOut" },
    }),
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1, transition: { duration: 0.25 } },
  };

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-orange-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex w-full items-center justify-between px-4 py-4 md:px-12">
          {/* Logo */}
          <Link href={`/${locale}`} className="shrink-0">
            <Image src="/images/logo.svg" alt="Logo" width={112} height={40} loading="eager"/>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6 text-sm lg:text-base font-medium">
            {navLinks.map((item) => {
              const to = `/${locale}${item === "home" ? "" : `/${item}`}`;
              const isActive =
                pathname === to ||
                (item !== "home" && pathname?.startsWith(to));
              return (
                <Link
                  key={item}
                  href={to}
                  className={`relative py-1 transition-colors duration-200 ${
                    isActive
                      ? "text-primary"
                      : "text-secondary hover:text-primary"
                  }`}
                >
                  {t(`nav.${item}`)}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4 lg:gap-10">
            <div className="flex items-center gap-2">
              <Button asChild variant="link" size="lg" className="border-0!">
                <Link href={`/${locale}/login`}>{t("login")}</Link>
              </Button>
              <Button asChild variant="default" size="lg" className="px-5!">
                <Link href={`/${locale}/signup`}>{t("signup")}</Link>
              </Button>
            </div>
            <Button asChild variant="link" size="lg">
              <Link href={switchHref}>
                {otherLocale.toUpperCase()}
                <RiGlobalFill />
              </Link>
            </Button>
          </div>

          {/* Mobile: Lang switcher + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <Button asChild variant="link" size="lg">
              <Link href={switchHref}>
                {otherLocale.toUpperCase()}
                <RiGlobalFill />
              </Link>
            </Button>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl transition-colors hover:bg-orange-50"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="block h-0.5 w-5 rounded-full bg-secondary origin-center"
              />
              <motion.span
                animate={
                  menuOpen
                    ? { opacity: 0, scaleX: 0 }
                    : { opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.2 }}
                className="block h-0.5 w-5 rounded-full bg-secondary"
              />
              <motion.span
                animate={
                  menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.25 }}
                className="block h-0.5 w-5 rounded-full bg-secondary origin-center"
              />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="overflow-hidden border-t border-orange-100 bg-white md:hidden"
            >
              <div className="flex flex-col px-4 pb-6 pt-4 gap-1">
                {/* Nav Links */}
                {navLinks.map((item, i) => {
                  const to = `/${locale}${item === "home" ? "" : `/${item}`}`;
                  const isActive =
                    pathname === to ||
                    (item !== "home" && pathname?.startsWith(to));
                  return (
                    <motion.div
                      key={item}
                      custom={i}
                      variants={linkVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                    >
                      <Link
                        href={to}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-base transition-colors ${
                          isActive
                            ? "bg-orange-50 text-primary"
                            : "text-secondary hover:bg-orange-50 hover:text-primary"
                        }`}
                      >
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        )}
                        {t(`nav.${item}`)}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Divider */}
                <motion.div
                  custom={navLinks.length}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="my-2 border-t border-orange-100"
                />

                {/* CTA Buttons */}
                <motion.div
                  custom={navLinks.length + 1}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="flex flex-col gap-3 px-1"
                >
                  <Button
                    asChild
                    variant="default"
                    size="lg"
                    className="w-full"
                  >
                    <Link
                      href={`/${locale}/signup`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {t("signup")}
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full"
                  >
                    <Link
                      href={`/${locale}/login`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {t("login")}
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-20 bg-black/20 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
