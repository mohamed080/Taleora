"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { colVariants, priceVariants } from "./cart-animations";

export function OrderSummary({
  total,
  itemCount,
  couponCode,
  setCouponCode,
  locale,
  t,
}: {
  total: number;
  itemCount: number;
  couponCode: string;
  setCouponCode: (v: string) => void;
  t: ReturnType<typeof useTranslations>;
  locale: string;
}) {
  return (
    <motion.div
      className="space-y-5 rounded-3xl border border-[#F4F4F4] p-6 sm:p-8 shadow-md lg:sticky lg:top-24"
      variants={colVariants}
    >
      <h4 className="text-2xl sm:text-3xl font-bold text-foreground text-center">
        {t("cart.orderSummary")}
      </h4>

      <span className="inline-flex w-full border-b border-[#F2F2F2]" />

      {/* Subtotal */}
      <div className="flex items-center justify-between text-sm sm:text-base">
        <span className="text-[#6F6F6F]">
          {t("cart.subtotal", { count: itemCount })}
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={total}
            variants={priceVariants}
            initial="initial"
            animate="animate"
            className="font-bold text-[#D40062]"
          >
            {total.toFixed(2)} EGP
          </motion.span>
        </AnimatePresence>
      </div>

      <span className="inline-flex w-full border-b border-[#F2F2F2]" />

      {/* Order total */}
      <div className="flex items-center justify-between text-sm sm:text-base">
        <span className="font-semibold text-[#2C2C2C]">
          {t("cart.orderTotal")}
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={`total-${total}`}
            variants={priceVariants}
            initial="initial"
            animate="animate"
            className="text-xl font-bold text-[#D40062]"
          >
            {total.toFixed(2)} EGP
          </motion.span>
        </AnimatePresence>
      </div>

      <span className="inline-flex w-full border-b border-[#F2F2F2]" />

      {/* Coupon */}
      <div className="space-y-2">
        <span className="block text-sm sm:text-base font-semibold text-[#2C2C2C]">
          {t("cart.couponCode")}
        </span>
        <div className="relative flex items-center gap-2">
          <motion.input
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder={t("cart.enterCode")}
            className="w-full rounded-lg border border-[#F4F4F4] px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#FFB24B]"
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="shrink-0 rounded-lg border border-[#FFB24B] px-4 py-3 text-sm font-semibold text-[#FFB24B] hover:bg-[#FEF9E3] transition-colors"
            disabled={!couponCode}
          >
            {t("cart.apply")}
          </motion.button>
        </div>
      </div>

      {/* CTA */}
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          asChild
          className="w-full py-6 sm:py-7 text-sm sm:text-base"
          variant="gradient"
          size="lg"
        >
          <Link href={`/${locale}/checkout/shipping`}>{t("cart.checkout")}</Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}
