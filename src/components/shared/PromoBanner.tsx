"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE_OUT } from "../ui/animations";
import { useLocale, useTranslations } from "next-intl";

export function PromoBanner() {
  const t = useTranslations("PromoBanner");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div className="relative w-full overflow-hidden">
      {/* ── Layer 1: photo — full height, anchored right ── */}
      <div
        className={`
          absolute inset-y-0
          w-[50%] lg:w-[46%]
          ${isRTL ? "left-0" : "right-0"}
        `}
      >
        <Image
          src="/images/banner-img.png"
          alt={t("imageAlt")}
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      {/* ── Layer 2: gradient — sits on top of the photo, fades left→right ── */}
      <div
        className="absolute inset-0"
        style={{
          background: isRTL
            ? "linear-gradient(-75.97deg, #FF6DCA 61.01%, rgba(255, 178, 75, 0) 79.19%)"
            : "linear-gradient(75.97deg, #FF6DCA 61.01%, rgba(255, 178, 75, 0) 79.19%)",
        }}
      />

      {/* ── Layer 3: text content ── */}
      <div
        className="relative z-10           
        flex flex-col justify-center
          min-h-40 sm:h-55 md:h-65.5
          ps-3 sm:ps-8 md:ps-12 lg:ps-32
          py-6 sm:py-0
          max-w-[60%] sm:max-w-[45%] md:max-w-[56%] lg:max-w-166"
      >
        <motion.h1
          className="text-xl sm:text-2xl md:text-4xl lg:text-[44px] font-bold text-white leading-tight"
          initial={{ opacity: 0, x: isRTL ? 28 : -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          {t("title")}
        </motion.h1>

        <motion.p
          className="text-sm md:text-base lg:text-xl text-white"
          initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.15 }}
        >
          {t("subtitle")}
        </motion.p>
      </div>
    </div>
  );
}

export default PromoBanner;
