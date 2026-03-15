"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn, SlideUp, EASE_OUT } from "../ui/animations";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <section className="relative bg-[#fff3df] min-h-[calc(100vh-68px)] flex items-center">
      {/* Shape top right */}
      <FadeIn
        delay={0}
        duration={0.7}
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
      </FadeIn>

      {/* Shape bottom left */}
      <FadeIn
        delay={0}
        duration={0.7}
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
      </FadeIn>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-2 md:items-center md:px-8 md:py-16">
        {/* Left / Text content */}
        <div className="flex flex-col items-center text-center md:items-start md:text-start z-10">
          <SlideUp
            delay={0}
            duration={0.6}
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
          </SlideUp>
          <SlideUp
            delay={0.15}
            duration={0.6}
            className="text-base leading-snug text-accent sm:text-lg md:text-[22px] lg:text-[26px] max-w-120"
          >
            <h1>
              {t.rich("title", {
                hero: (chunks) => (
                  <span className="bg-[linear-gradient(132.78deg,#FF6DCA_37.86%,#FFB24B_86.43%)] bg-clip-text text-transparent">
                    {chunks}
                  </span>
                ),
              })}
            </h1>
          </SlideUp>

          <SlideUp
            delay={0.3}
            duration={0.6}
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
          </SlideUp>
        </div>

        {/* Right / Hero image — visible on md+ */}
        <motion.div
          initial={{ opacity: 0, x: isRTL ? -60 : 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.3 }}
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
        <SlideUp
          delay={0.45}
          duration={0.6}
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
        </SlideUp>
      </div>
    </section>
  );
}
