"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FadeIn, SlideUp, StaggerContainer, StaggerItem, EASE_OUT } from "../ui/animations";

export function MagicWorks() {
  const t = useTranslations("magicWorks");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const steps = [
    {
      icon: "/images/Literature.svg",
      title: t("steps.step1.title"),
      description: t("steps.step1.description"),
      alt: t("steps.step1.iconAlt"),
      bg: "bg-[#FEF9E3]",
    },
    {
      icon: "/images/Camera Intelligence.svg",
      title: t("steps.step2.title"),
      description: t("steps.step2.description"),
      alt: t("steps.step2.iconAlt"),
      bg: "bg-secondary",
    },
    {
      icon: "/images/Magic Crystal Ball.svg",
      title: t("steps.step3.title"),
      description: t("steps.step3.description"),
      alt: t("steps.step3.iconAlt"),
      bg: "bg-primary",
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-10">
      <div className="mx-auto grid max-w-full gap-8 px-5 md:pl-0 md:grid-cols-10 md:items-center">
        
        {/* Image column */}
        <motion.div
          initial={{ opacity: 0, x: isRtl ? 60 : -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isRtl ? 60 : -60 }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.2 }}
          className={`order-1 md:col-span-3 flex justify-center ${isRtl ? "md:order-2" : ""}`}
        >
          <div className="w-full max-w-75 sm:max-w-85 md:max-w-none">
            <Image
              src="/images/magicwork-image.png"
              alt={t("title")}
              width={400}
              height={600}
              priority
              draggable={false}
              className="w-full h-auto object-contain"
            />
          </div>
        </motion.div>

        {/* Content column */}
        <div className={`relative order-2 md:col-span-7 ${isRtl ? "md:order-1" : ""}`}>
          
          {/* Decorative line — hidden on mobile */}
          <div className="absolute left-1/2 md:top-55 lg:top-44 -translate-x-1/2 w-8/12 opacity-90 hidden md:block pointer-events-none">
            <Image
              src="/images/Line 1.svg"
              alt="Decorative line"
              width={1200}
              height={150}
              className="w-full"
              draggable={false}
            />
          </div>

          {/* Heading */}
          <SlideUp
            delay={0}
            className="text-3xl sm:text-4xl font-bold text-accent text-center"
          >
            <h1>{t("title")}</h1>
          </SlideUp>

          <SlideUp
            delay={0.15}
            className="text-gray font-medium text-lg sm:text-xl mb-10 md:mb-16 text-center"
          >
            <p>{t("subtitle")}</p>
          </SlideUp>

          {/* Steps grid */}
          <StaggerContainer
            delayChildren={0.3}
            staggerChildren={0.15}
            className="grid gap-4 grid-cols-1 sm:grid-cols-3"
          >
            {steps.map((step, i) => (
              <StaggerItem
                key={step.title}
                className="flex flex-col items-center gap-6 py-8 px-4"
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={isInView ? { rotate: 12 } : { rotate: 0 }}
                  transition={{ delay: i * 0.15 + 0.5, duration: 0.5, ease: "easeOut" }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className={`rounded-md w-20 h-20 flex items-center justify-center ${step.bg} cursor-pointer`}
                >
                  <Image
                    src={step.icon}
                    alt={step.alt}
                    width={54}
                    height={54}
                    draggable={false}
                  />
                </motion.div>
                <div>
                  <h4 className="font-bold text-xl sm:text-2xl text-black text-center mb-1">
                    {step.title}
                  </h4>
                  <p className="text-gray font-medium text-sm text-center">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}