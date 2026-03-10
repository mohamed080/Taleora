"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useKeenSlider } from "keen-slider/react";
import { Button } from "../ui/button";
import { IoMdTrophy } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
import "keen-slider/keen-slider.min.css";
import Link from "next/link";
import { useInView, motion } from "framer-motion";
import { books } from "@/lib/books";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
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

export function TopRatedBooks() {
  const t = useTranslations("books");
  const locale = useLocale();
  const isRTL = useMemo(() => locale.startsWith("ar"), [locale]);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const slideGroups = useMemo(() => {
    const groups: Array<(typeof books)[number][]> = [];
    for (let i = 0; i < books.length; i += 2) {
      groups.push(books.slice(i, i + 2));
    }
    return groups;
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    rtl: isRTL,
    loop: true,
    slides: { perView: 1, spacing: 24 },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  return (
    <section ref={sectionRef} className="text-center px-4 overflow-hidden">
      {/* Badge */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={0}
      >
        <Button
          variant="link"
          size="lg"
          className="px-7 py-5 rounded-full mb-10"
        >
          <IoMdTrophy />
          {t("title")}
        </Button>
      </motion.div>
      {/* Heading */}
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={1}
        className="text-3xl sm:text-4xl font-bold text-accent text-center"
      >
        {t("title")}
      </motion.h1>
      {/* Subtitle */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={2}
        className="text-gray font-medium text-lg sm:text-xl mb-5 text-center"
      >
        {t("subtitle")}
      </motion.p>

      <div className="relative max-w-7xl mx-auto mb-18">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          {/* Slider */}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={3}
            className="relative w-full"
          >
            {/* Prev arrow */}

            <button
              type="button"
              onClick={() => instanceRef.current?.prev()}
              disabled={currentSlide === 0}
              aria-label={t("prev")}
              className="absolute top-1/2 -left-2 lg:-left-4 2xl:-left-20 -translate-y-1/2 z-10 rounded-full transition cursor-pointer  disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Image
                src={
                  isRTL ? "/images/arrow-right.svg" : "/images/arrow-left.svg"
                }
                alt={t("prev")}
                width={60}
                height={60}
                className="w-12 lg:w-15 rounded-full lg:rounded-0"
              />
            </button>

            {/* Slides */}
            <div ref={sliderRef} className="keen-slider overflow-hidden">
              {slideGroups.map((group, groupIdx) => (
                <div
                  key={groupIdx}
                  className="keen-slider__slide flex justify-center py-5 px-2 sm:px-5"
                >
                  <div className="space-y-4 sm:space-y-6 w-full max-w-150">
                    {group.map((slide) => (
                      <div
                        key={slide.id}
                        className="bg-white shadow-lg rounded-xl p-4 sm:p-7 w-full grid gap-4 sm:gap-6 grid-cols-[auto_1fr]"
                      >
                        {/* Book Cover */}
                        <div className="flex items-center justify-center">
                          <Image
                            src={slide.image}
                            alt={t("imageAlt")}
                            width={135}
                            height={260}
                            className="rounded-2xl object-cover w-22.5 sm:w-27.5 lg:w-33.75 h-auto"
                            priority={slide.id === 1}
                          />
                        </div>

                        {/* Book Details */}
                        <div className="flex flex-col justify-between text-start py-4 sm:py-6">
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-gray mb-1">
                              {t(`${slide.key}.age`)}
                            </p>
                            <h4 className="text-base sm:text-xl font-bold mb-2">
                              {t(`${slide.key}.title`)}
                            </h4>
                            <p className="text-xs sm:text-base text-gray font-medium mb-3 line-clamp-2 sm:line-clamp-none">
                              {t(`${slide.key}.subtitle`)}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <div
                                className="flex items-center gap-1 text-[#F5C15E] shadow-md rounded-full px-2 py-1 text-base sm:text-lg"
                                aria-label={t("ratingAlt")}
                              >
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar className="opacity-30" />
                              </div>
                              <span className="text-xs sm:text-sm text-gray font-medium">
                                {t(`${slide.key}.sold`)}
                              </span>
                            </div>
                            <div className="text-end">
                              <Button
                                asChild
                                className="px-5 py-4 sm:px-10 sm:py-6 "
                                variant="gradient"
                                size="lg"
                              >
                                <Link href={`/${locale}/books/${slide.id}`}>
                                  {t("personalize")}
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Next arrow */}
            <button
              type="button"
              onClick={() => instanceRef.current?.next()}
              disabled={currentSlide === slideGroups.length - 1}
              aria-label={t("next")}
              className="absolute top-1/2 -right-2 lg:-right-4 2xl:-right-20 -translate-y-1/2 z-10  p-3 transition cursor-pointer  disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Image
                src={
                  isRTL ? "/images/arrow-left.svg" : "/images/arrow-right.svg"
                }
                alt={t("next")}
                width={60}
                height={60}
                className="w-12 lg:w-15 rounded-full lg:rounded-0"
              />
            </button>

            {/* Dots */}
            <div className="mt-6 flex justify-center gap-2">
              {slideGroups.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => instanceRef.current?.moveToIdx(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentSlide
                      ? "bg-secondary w-8 sm:w-10"
                      : "bg-secondary/45 w-2 hover:bg-secondary/80"
                  }`}
                  aria-label={`${t("prev")} ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>
          {/* Side image */}
          <motion.div
            variants={slideIn(isRTL ? "left" : "right")}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={`w-full flex justify-center mt-5! lg:mt-0 max-w-75 sm:max-w-95 md:max-w-none ${isRTL ? "lg:mr-auto" : "lg:ml-auto"}`}
          >
            <Image
              src="/images/topRated-image.png"
              alt="Top Rated Books"
              width={550}
              height={570}
              draggable={false}
              className=" h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
