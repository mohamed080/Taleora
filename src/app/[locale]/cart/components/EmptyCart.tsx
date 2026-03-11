"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { EASE_OUT } from "./cart-animations";

export function EmptyCart({
  locale,
  t,
}: {
  locale: string;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <motion.section
      className="px-4 py-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
    >
      <div className="mx-auto max-w-6xl text-center space-y-4">
        <h1 className="text-3xl font-bold">{t("cart.emptyTitle")}</h1>
        <p className="text-gray">{t("cart.emptyDescription")}</p>
        <Link
          href={`/${locale}/books`}
          className="inline-flex rounded-lg bg-primary px-6 py-3 text-white"
        >
          {t("cart.browse")}
        </Link>
      </div>
    </motion.section>
  );
}
