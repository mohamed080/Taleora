"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { FaRegCopyright } from "react-icons/fa";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Footer() {
  const t = useTranslations("footer");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer className="border-t border-orange-100 bg-[#FEF9E3]">
      <div
        ref={ref}
        className="mx-auto grid max-w-7xl gap-8 px-4 py-10 grid-cols-2 md:grid-cols-4 md:px-8"
      >
        {/* Logo */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
          className="col-span-2 md:col-span-1"
        >
          <Image
            src="/images/footer-logo.svg"
            alt="Taleora Logo"
            width={270}
            height={100}
            draggable={false}
            className="w-40 sm:w-56 md:w-[270px] h-auto"
          />
        </motion.div>

        {/* Product */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={1}
        >
          <h4 className="font-medium text-lg text-primary">{t("product")}</h4>
          <ul className="mt-5 space-y-2 text-sm sm:text-base font-medium text-[#FFB24B]">
            <li className="hover:opacity-75 cursor-pointer transition-opacity">{t("productLinks.feature")}</li>
            <li className="hover:opacity-75 cursor-pointer transition-opacity">{t("productLinks.apiintegration")}</li>
            <li className="hover:opacity-75 cursor-pointer transition-opacity">{t("productLinks.pricing")}</li>
            <li className="hover:opacity-75 cursor-pointer transition-opacity">{t("productLinks.faq")}</li>
          </ul>
        </motion.div>

        {/* Info */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={2}
        >
          <h4 className="font-medium text-lg text-primary">{t("info")}</h4>
          <ul className="mt-5 space-y-2 text-sm sm:text-base font-medium text-[#FFB24B]">
            <li className="hover:opacity-75 cursor-pointer transition-opacity">{t("infoLinks.privacypolicy")}</li>
            <li className="hover:opacity-75 cursor-pointer transition-opacity">{t("infoLinks.terms")}</li>
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={3}
        >
          <h4 className="font-medium text-lg text-primary">{t("contact")}</h4>
          <ul className="mt-5 space-y-2 text-sm sm:text-base font-medium text-[#FFB24B]">
            <li>{t("contactLines.address")}</li>
            <li>{t("contactLines.email")}</li>
            <li>{t("contactLines.phone")}</li>
            <li>{t("contactLines.phone2")}</li>
          </ul>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={4}
        className="border-t border-t-primary text-center"
      >
        <p className="py-3 text-sm sm:text-base text-primary flex justify-center items-center gap-2">
          <FaRegCopyright />
          {t("copyright")}
        </p>
      </motion.div>
    </footer>
  );
}