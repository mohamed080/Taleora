"use client";

import { motion, AnimatePresence } from "framer-motion";
import { itemVariants, priceVariants } from "./customize-animations";

export function PriceSummary({
  basePrice,
  coverPrice,
  totalPrice,
  t,
}: {
  basePrice: number;
  coverPrice: number;
  totalPrice: number;
  t: any;
}) {
  return (
    <motion.div
      className="rounded-2xl bg-muted/50 p-5"
      variants={itemVariants}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm sm:text-base">{t("customize.basePrice")}</span>
        <span className="font-semibold">{basePrice} EGP</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm sm:text-base">{t("customize.coverOptions")}</span>
        <motion.span
          key={coverPrice}
          variants={priceVariants}
          initial="initial"
          animate="animate"
          className="font-semibold text-sm sm:text-base"
        >
          {coverPrice} EGP
        </motion.span>{" "}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-muted pt-3">
        <span className="font-bold">{t("customize.total")}</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={totalPrice}
            variants={priceVariants}
            initial="initial"
            animate="animate"
            className="text-xl sm:text-2xl font-bold text-[#FFB24B]"
          >
            {totalPrice.toFixed(2)} EGP
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
