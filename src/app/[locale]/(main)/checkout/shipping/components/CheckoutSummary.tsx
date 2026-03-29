"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiDollarSign } from "react-icons/fi";
import { FaShieldAlt } from "react-icons/fa";
import { getBookById } from "@/lib/books";
import { useCartStore } from "@/store/useCartStore";
import { Button, colVariants, itemVariants, priceVariants } from "@/components/ui";

type CheckoutSummaryProps = {
  isFormValid: boolean;
  shippingFee: number;
};

export function CheckoutSummary({ isFormValid, shippingFee }: CheckoutSummaryProps) {
  const t = useTranslations("books");
  const cart = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const orderTotal = subtotal + shippingFee;

  return (
    <motion.div
      variants={colVariants}
      className="rounded-3xl border border-[#F0F0F0] bg-white p-6 sm:p-8 shadow-md space-y-5 lg:sticky lg:top-24"
    >
      <h4 className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">
        {t("cart.orderSummary")}
      </h4>

      <span className="inline-flex w-full border-b border-[#F0F0F0]" />

      {/* Cart items */}
      <div className="space-y-4">
        {cart.map((item, i) => {
          const book = getBookById(item.bookId);
          const bookTitle =
            (book && t(`${book.key}.title`)) || item.bookTitle || `Book #${item.bookId}`;
          const imageSrc = item.photo?.trim() || book?.image || "/images/story-img.jpg";
          const isDataUrl = typeof imageSrc === "string" && imageSrc.startsWith("data:");
          const coverLabel =
            item.cover === "sturdy"
              ? t("customize.coverSturdy")
              : item.cover === "luxury"
              ? t("customize.coverLuxury")
              : "—";

          return (
            <motion.div
              key={item.date ?? i}
              variants={itemVariants}
              className="flex flex-col sm:flex-row sm:items-center gap-3"
            >
              <Image
                src={imageSrc}
                alt={bookTitle}
                width={56}
                height={78}
                className="rounded-xl object-cover shrink-0"
                draggable={false}
              />
              <div className="flex-1 min-w-0 space-y-0.5">
                <p className="text-sm font-bold text-[#1A1A1A] truncate">{bookTitle}</p>
                <p className="text-xs text-[#6F6F6F]">
                  <strong>{t("cart.childNameLabel")}:</strong> {item.name || "—"}
                </p>
                <p className="text-xs text-[#6F6F6F]">
                  <strong>{t("cart.coverTypeLabel")}:</strong> {coverLabel}
                </p>
              </div>
              <span className="text-sm sm:text-base font-medium text-[#1A1A1A] shrink-0">
                {Number(item.totalPrice).toFixed(2)} EGP
              </span>
            </motion.div>
          );
        })}
      </div>

      <span className="inline-flex w-full border-b border-[#F0F0F0]" />

      {/* Subtotal */}
      <div className="flex justify-between text-sm sm:text-base">
        <span className="text-[#6F6F6F]">{t("cart.subtotal", { count: cart.length })}</span>
        <motion.span
          key={subtotal}
          variants={priceVariants}
          initial="initial"
          animate="animate"
          className="font-semibold text-[#1A1A1A]"
        >
          {subtotal.toFixed(2)} EGP
        </motion.span>
      </div>

      {/* Shipping */}
      <div className="flex justify-between text-sm sm:text-base">
        <span className="text-[#6F6F6F]">{t("checkout.shippingFee")}</span>
        <span className="font-semibold text-[#1A1A1A]">{shippingFee} EGP</span>
      </div>

      <span className="inline-flex w-full border-b-2 border-[#F0F0F0]" />

      {/* Order total */}
      <div className="flex justify-between items-center">
        <span className="text-base sm:text-lg font-bold text-[#1A1A1A]">{t("cart.orderTotal")}</span>
        <motion.span
          key={orderTotal}
          variants={priceVariants}
          initial="initial"
          animate="animate"
          className="text-xl sm:text-2xl font-bold text-[#D40062]"
        >
          {orderTotal.toFixed(2)} EGP
        </motion.span>
      </div>

      {/* CTA */}
      <motion.div whileHover={isFormValid ? { scale: 1.02 } : {}} whileTap={isFormValid ? { scale: 0.98 } : {}}>
        <Button
          className="w-full py-6 sm:py-7 text-sm sm:text-base disabled:pointer-events-auto disabled:cursor-not-allowed!"
          variant="gradient"
          size="lg"
          disabled={!isFormValid}
        >
          <span className="flex items-center justify-center w-6 h-6 rounded-full p-1 border border-primary bg-white text-[#ff6dc9]">
            <FiDollarSign size={16} />
          </span>
          {t("checkout.confirm")}
        </Button>
      </motion.div>

      {/* Trust badge */}
      <div className="flex items-center justify-center gap-1.5 text-xs text-primary">
        <FaShieldAlt className="text-[#D40062]" size={12} />
        {t("checkout.private")}
      </div>
    </motion.div>
  );
}
