"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
  }),
};

const slideIn = (direction: "left" | "right") => ({
  hidden: { opacity: 0, x: direction === "right" ? 60 : -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay: 0.3 },
  },
});

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <section className="relative bg-[#fff3df] min-h-[calc(100vh-68px)] flex items-center">
      {/* Shape top right */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={0}
        className="absolute -top-8 right-0 pointer-events-none"
      >
        <Image
          src="/images/shape-top-right.svg"
          alt="Star Shape image"
          width={220}
          height={400}
          priority
          draggable={false}
          className="object-contain w-30 md:w-45 lg:w-55"
        />
      </motion.div>

      {/* Shape bottom left */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={0}
        className="absolute bottom-0 left-0 pointer-events-none"
      >
        <Image
          src="/images/shape-bottom-left.svg"
          alt="Star Shape image"
          width={120}
          height={330}
          priority
          draggable={false}
          className="object-contain w-17.5 md:w-25 lg:w-30"
        />
      </motion.div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-2 md:items-center md:px-8 md:py-16">
        {/* Left / Text content */}
        <div className="flex flex-col items-center text-center md:items-start md:text-start z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="mb-4 w-full max-w-85 sm:max-w-105 md:max-w-130 lg:max-w-145"
          >
            <Image
              src="/images/hero-logo.png"
              alt="Taleora Logo"
              width={580}
              height={174}
              draggable={false}
              priority
              className="w-full h-auto"
            />
          </motion.div>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          className="text-base leading-snug text-accent sm:text-lg md:text-[22px] lg:text-[26px] max-w-120">
            {t.rich("title", {
              hero: (chunks) => (
                <span className="bg-[linear-gradient(132.78deg,#FF6DCA_37.86%,#FFB24B_86.43%)] bg-clip-text text-transparent">
                  {chunks}
                </span>
              ),
            })}
          </motion.h1>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-6 md:gap-8"
          >
            <Button asChild variant="default" size="lg" className="px-5 py-3 md:px-7 md:py-5">
              <Link href={`/${locale}/login`}>{t("view")}</Link>
            </Button>
            <div className="flex items-center gap-1.5">
              <Image
                src="/images/Protect.svg"
                alt="Protect Shield image"
                width={20}
                height={20}
              />
              <p className="text-primary text-base font-semibold">
                {t("private")}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right / Hero image — visible on md+ */}
        <motion.div
        variants={slideIn(isRTL ? "left" : "right")}
        initial="hidden"
        animate="visible"
          className={`absolute top-8 hidden md:block ${isRTL ? "left-0" : "right-0"}`}
        >
          <Image
            src="/images/hero-image.png"
            alt="Hero Image"
            width={680}
            height={500}
            priority
            draggable={false}
            className="max-w-120 lg:max-w-150 xl:max-w-170 object-contain drop-shadow-xl"
          />
        </motion.div>

         {/* Mobile hero image — shown below text on small screens */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                  className="flex md:hidden justify-center z-10 -mx-4"
                >
                  <Image
                    src="/images/hero-image.png"
                    alt="Hero Image"
                    width={480}
                    height={360}
                    priority
                    draggable={false}
                    className="w-full max-w-90 sm:max-w-105 object-contain drop-shadow-lg"
                  />
                </motion.div>
      </div>
    </section>
  );
}
