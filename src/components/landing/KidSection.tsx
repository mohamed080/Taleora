"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useKeenSlider } from "keen-slider/react";
import { Button } from "../ui/button";
import { AiFillStar } from "react-icons/ai";
import "keen-slider/keen-slider.min.css";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FadeIn, SlideUp, EASE_OUT } from "../ui/animations";

const books = [
  { id: 1, image: "/images/bookposter-1.png", key: "book1" },
  { id: 2, image: "/images/bookposter-2.png", key: "book2" },
  { id: 3, image: "/images/bookposter-1.png", key: "book1" },
  { id: 4, image: "/images/bookposter-2.png", key: "book2" },
];

export function KidSection() {
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
    <section ref={sectionRef} className="max-w-7xl mx-auto mb-18 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

        {/* Slider */}
        <SlideUp
          delay={0.45}
          margin="-80px"
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
              src={isRTL ? "/images/arrow-right-blue.svg" : "/images/arrow-left-blue.svg"}
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
                      className="bg-white shadow-lg rounded-xl p-4 sm:p-7 w-full grid grid-cols-[auto_1fr] gap-4 sm:gap-6"
                    >
                      {/* Book cover */}
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

                      {/* Book details */}
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
                          <div className="flex items-center flex-wrap gap-2 mb-3">
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
                              className="px-5 py-4 sm:px-10 sm:py-6 text-sm sm:text-base bg-[#009FD9] hover:bg-[#009FD9]/80"
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
              src={isRTL ? "/images/arrow-left-blue.svg" : "/images/arrow-right-blue.svg"}
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
                    ? "bg-[#009FD9] w-8 sm:w-10"
                    : "bg-[#009FD9]/45 w-2 hover:bg-[#009FD9]/80"
                }`}
                aria-label={`${t("prev")} ${idx + 1}`}
              />
            ))}
          </div>
        </SlideUp>

        {/* Right — text + image */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-start mt-5">
          <SlideUp
            delay={0}
            margin="-80px"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0064AB] mb-3 mt-5 font-seasons"
          >
            <h1>
              {t("kid.title")} <br />
              <span className="text-[#009FD9]">{t("kid.highlight")}</span>
            </h1>
          </SlideUp>

          <SlideUp
            delay={0.15}
            margin="-80px"
            className="text-gray font-medium text-xl sm:text-2xl lg:text-3xl mb-8 sm:mb-12"
          >
            <p>{t("kid.subtitle")}</p>
          </SlideUp>

          <SlideUp
            delay={0.3}
            margin="-80px"
            className="w-full max-w-75 sm:max-w-95 md:max-w-none flex justify-center lg:justify-start"
          >
            <Image
              src="/images/kid.png"
              alt={t("kid.imageAlt")}
              width={511}
              height={570}
              draggable={false}
              className={`w-full h-auto object-contain ${isRTL ? "mr-auto" : "ml-auto"}`}
            />
          </SlideUp>
        </div>

      </div>
    </section>
  );
}