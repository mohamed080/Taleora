"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { type Variants } from "framer-motion";

import { CartSkeleton, EmptyCart } from "./components";
import { useCartStore } from "@/store/useCartStore";
import { CartClient } from "./CartClient";
import { CartSummary } from "./CartSummary";

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const colVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export function CartWrapper({
  locale,
  title,
  continueShopping,
  continueShoppingHref,
}: {
  locale: string;
  title: string;
  continueShopping: string;
  continueShoppingHref: string;
}) {
  const [mounted, setMounted] = useState(false);
  const cart = useCartStore((state) => state.items);
  const t = useTranslations("books");

  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = cart.length;

  if (!mounted) return <CartSkeleton />;
  if (!itemCount) return <EmptyCart locale={locale} t={t} />;

  return (
    <motion.div
      className="grid gap-7 lg:grid-cols-[60%_40%] items-start"
      variants={pageVariants}
    >
      {/* Left — cart items */}
      <motion.div
        className="space-y-6 rounded-3xl border border-[#F4F4F4] p-4 sm:p-8 shadow-md"
        variants={colVariants}
      >
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            {title}
          </h4>
          <a
            href={continueShoppingHref}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-primary text-primary-foreground shadow hover:bg-primary/90 text-sm"
          >
            {continueShopping}
          </a>
        </div>

        <span className="inline-flex w-full border-b-2 border-[#F2F2F2]" />

        {/* Client side Item Management */}
        <CartClient locale={locale} />
      </motion.div>

      {/* Right — order summary */}
      <CartSummary locale={locale} />
    </motion.div>
  );
}
