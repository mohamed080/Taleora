"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, type Variants } from "framer-motion";
import { getBookById } from "@/lib/books";
import { FaShieldAlt } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import { GrUndo } from "react-icons/gr";
import { Skeleton } from "@/components/ui/skeleton";
import { FiDollarSign } from "react-icons/fi";

import { useCartStore } from "@/store/useCartStore";

const SHIPPING_FEE = 25;

// ── Easing & Variants ─────────────────────────────────────────────────────────
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const colVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE_OUT } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: EASE_OUT } },
};

const priceVariants: Variants = {
  initial: { opacity: 0, y: -5 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
};

// ── Shared input style ────────────────────────────────────────────────────────
const inputCls =
  "w-full rounded-xl border border-[#F0F0F0] bg-white px-4 py-3 text-sm text-[#2C2C2C] placeholder:text-[#C4C4C4] focus:outline-none focus:ring-2 focus:ring-[#FFB24B] transition-all";

// ── Skeleton ──────────────────────────────────────────────────────────────────
function ShippingSkeleton() {
  return (
    <section className="px-4 py-10 sm:py-14 bg-[#FAFAFA] min-h-screen">
      <div className="mx-auto max-w-6xl space-y-6">
        <Skeleton className="h-10 w-32" />
        <div className="grid gap-6 lg:grid-cols-[1fr_420px] items-start">
          <div className="rounded-3xl border border-[#F0F0F0] bg-white p-6 sm:p-8 shadow-md space-y-7">
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-xl" />
              <Skeleton className="h-8 w-48" />
            </div>
            <span className="inline-flex w-full border-b border-[#F9F9F9]" />
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-[46px] w-full rounded-xl" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-[46px] w-full rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-[46px] w-full rounded-xl" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-[46px] w-full rounded-xl" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-[46px] w-full rounded-xl" />
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-[#F0F0F0] bg-white p-6 sm:p-8 shadow-md space-y-5 lg:sticky lg:top-24">
            <Skeleton className="h-8 w-40" />
            <span className="inline-flex w-full border-b border-[#F0F0F0]" />
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-[78px] w-[56px] rounded-xl shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <Skeleton className="h-5 w-16" />
                </div>
              ))}
            </div>
            <span className="inline-flex w-full border-b border-[#F0F0F0]" />
            <div className="flex justify-between">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-16" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-16" />
            </div>
            <span className="inline-flex w-full border-b-2 border-[#F0F0F0]" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
            <Skeleton className="h-[52px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Page() {
  const params = useParams() as { locale?: string };
  const locale = params?.locale ?? "en";
  const router = useRouter();
  const t = useTranslations("books");

  // hydration
  const [mounted, setMounted] = useState(false);
  const cart = useCartStore((state) => state.items);

  useEffect(() => {
    setMounted(true);
  }, []);

  // form state
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const set = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const subtotal = useCartStore((state) => state.getSubtotal());
  const orderTotal = subtotal + SHIPPING_FEE;

  const isFormValid =
    form.fullName.trim() &&
    form.phone.trim() &&
    form.address.trim() &&
    form.city.trim();

  if (!mounted) return <ShippingSkeleton />;

  return (
    <motion.section
      className="px-4 py-10 sm:py-14 bg-[#FAFAFA] min-h-screen"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mx-auto max-w-6xl space-y-6">

        {/* Back button */}
        <motion.div variants={itemVariants}>
          <Button
            asChild
            size="lg"
            className="px-4 h-10 text-sm"
          >
            <Link
              href={`/${locale}/cart`}
            >
              <GrUndo className="size-[22px]" />

              {t("cart.continueShopping")}
            </Link>
          </Button>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-6 lg:grid-cols-[1fr_420px] items-start">

          {/* ── Left: Shipping form ── */}
          <motion.div
            variants={colVariants}
            className="min-w-0 rounded-3xl border border-[#F0F0F0] bg-white p-6 sm:p-8 shadow-md space-y-7"
          >
            {/* Title */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <Image
                src='/images/parachute.svg'
                width={30}
                height={30}
                alt="parachute"
              />
              <h4 className="text-xl sm:text-2xl font-bold text-black">
                {t("checkout.shippingInfo")}
              </h4>
            </motion.div>

            <span className="inline-flex w-full border-b border-[#F9F9F9]" />

            {/* Row 1 – Full name + Phone */}
            <motion.div variants={itemVariants} className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-semibold text-[#2C2C2C]">
                  {t("checkout.fullName")}
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.18 }}
                  className={inputCls}
                  placeholder={t("checkout.fullNamePlaceholder")}
                  value={form.fullName}
                  onChange={set("fullName")}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-semibold text-[#2C2C2C]">
                  {t("checkout.phoneNumber")}
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.18 }}
                  className={inputCls}
                  placeholder={t("checkout.phoneNumberPlaceholder")}
                  value={form.phone}
                  onChange={set("phone")}
                  type="tel"
                />
              </div>
            </motion.div>

            {/* Row 2 – Address */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="block text-sm sm:text-base font-semibold text-[#2C2C2C]">
                {t("checkout.detailedAddress")}
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.18 }}
                className={inputCls}
                placeholder={t("checkout.detailedAddressPlaceholder")}
                value={form.address}
                onChange={set("address")}
              />
            </motion.div>

            {/* Row 3 – City + Postal code */}
            <motion.div variants={itemVariants} className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-semibold text-[#2C2C2C]">
                  {t("checkout.city")}
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.18 }}
                  className={inputCls}
                  placeholder={t("checkout.cityPlaceholder")}
                  value={form.city}
                  onChange={set("city")}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-semibold text-[#2C2C2C]">
                  {t("checkout.postalCode")}
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.18 }}
                  className={inputCls}
                  placeholder={t("checkout.postalCodePlaceholder")}
                  value={form.postalCode}
                  onChange={set("postalCode")}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: Order summary ── */}
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
                  (book && t(`${book.key}.title`)) ||
                  item.bookTitle ||
                  `Book #${item.bookId}`;
                const imageSrc =
                  item.photo?.trim() ||
                  book?.image ||
                  "/images/story-img.jpg";
                const isDataUrl =
                  typeof imageSrc === "string" && imageSrc.startsWith("data:");
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
                    {isDataUrl ? (
                      <Image
                        src={imageSrc}
                        alt={bookTitle}
                        width={56}
                        height={78}
                        className="rounded-xl object-cover shrink-0"
                        draggable={false}
                      />
                    ) : (
                      <Image
                        src={imageSrc}
                        alt={bookTitle}
                        width={56}
                        height={78}
                        className="rounded-xl object-cover shrink-0"
                        draggable={false}
                      />
                    )}
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
              <motion.span key={subtotal} variants={priceVariants} initial="initial" animate="animate"
                className="font-semibold text-[#1A1A1A]">
                {subtotal.toFixed(2)} EGP
              </motion.span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between text-sm sm:text-base">
              <span className="text-[#6F6F6F]">{t("checkout.shippingFee")}</span>
              <span className="font-semibold text-[#1A1A1A]">{SHIPPING_FEE} EGP</span>
            </div>

            <span className="inline-flex w-full border-b-2 border-[#F0F0F0]" />

            {/* Order total */}
            <div className="flex justify-between items-center">
              <span className="text-base sm:text-lg font-bold text-[#1A1A1A]">{t("cart.orderTotal")}</span>
              <motion.span key={orderTotal} variants={priceVariants} initial="initial" animate="animate"
                className="text-xl sm:text-2xl font-bold text-[#D40062]">
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
                <span className="flex items-center justify-center  w-[24px] h-[24px] rounded-full p-1 border border-primary bg-white text-[#ff6dc9]">
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

        </div>
      </div>
    </motion.section>
  );
} 