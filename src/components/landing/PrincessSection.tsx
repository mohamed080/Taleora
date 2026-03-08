"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useKeenSlider } from "keen-slider/react";
import { Button } from "../ui/button";
import { AiFillStar } from "react-icons/ai";
import "keen-slider/keen-slider.min.css";
import Link from "next/link";

const books = [
  {
    id: 1,
    image: "/images/bookposter-1.png",
    key: "book1",
  },
  {
    id: 2,
    image: "/images/bookposter-2.png",
    key: "book2",
  },
  {
    id: 3,
    image: "/images/bookposter-1.png",
    key: "book1",
  },
  {
    id: 4,
    image: "/images/bookposter-2.png",
    key: "book2",
  },
];

export function PrincessSection() {
  const t = useTranslations("books");
  const locale = useLocale();
  const isRTL = useMemo(() => locale.startsWith("ar"), [locale]);

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
    <section className="py-10 max-w-7xl mx-auto ">
      <div className="grid md:grid-cols-2 gap-2 items-center">
        <div>
          <h1 className="text-5xl font-bold text-[#82003C] mb-4">
            {t("princess.title")} <br />
            <span className="text-primary">{t("princess.highlight")}</span>
          </h1>
          <p className="text-gray font-medium text-3xl mb-12">
            {t("princess.subtitle")}
          </p>
          <Image
            src="/images/princess.png"
            alt={t("princess.imageAlt")}
            width={511}
            height={570}
            draggable={false}
          />
        </div>
        {/* Slider */}
        <div className="relative">
          <button
            type="button"
            onClick={() => instanceRef.current?.prev()}
            disabled={currentSlide === 0}
            aria-label={t("prev")}
            className="absolute top-1/2 -left-20 -translate-y-1/2 z-10 rounded-full transition cursor-pointer  disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Image
              src="/images/arrow-left-pink.svg"
              alt={t("prev")}
              width={60}
              height={60}
            />
          </button>

          <div ref={sliderRef} className="keen-slider overflow-hidden">
            {slideGroups.map((group, groupIdx) => (
              <div
                key={groupIdx}
                className="keen-slider__slide flex justify-center py-5"
              >
                <div className="space-y-6">
                  {group.map((slide) => (
                    <div
                      key={slide.id}
                      className="bg-white shadow-lg rounded-xl p-7 w-full max-w-155 max-h-80 grid grid-cols-1 gap-6 sm:grid-cols-[auto_1fr]"
                    >
                      <div className="flex items-center justify-center">
                        <Image
                          src={slide.image}
                          alt={t("imageAlt")}
                          width={135}
                          height={260}
                          className="rounded-2xl object-cover"
                          priority={slide.id === 1}
                        />
                      </div>
                      <div className="flex flex-col justify-between">
                        <div className="text-start my-8">
                          <p className="text-sm font-bold text-gray mb-2">
                            {t(`${slide.key}.age`)}
                          </p>
                          <h4 className="text-xl font-bold mb-3">
                            {t(`${slide.key}.title`)}
                          </h4>
                          <p className="text-base text-gray font-medium mb-4">
                            {t(`${slide.key}.description`)}
                          </p>
                          <div className="flex items-center gap-2 mb-4">
                            <div
                              className="flex items-center gap-1 text-[#F5C15E] shadow-md rounded-full px-2 py-1 text-lg"
                              aria-label={t("ratingAlt")}
                            >
                              <AiFillStar />
                              <AiFillStar />
                              <AiFillStar />
                              <AiFillStar />
                              <AiFillStar className="opacity-30" />
                            </div>
                            <span className="text-sm text-gray font-medium">
                              {t(`${slide.key}.sold`)}
                            </span>
                          </div>
                          <div className="text-end">
                            <Button
                            asChild
                              className="px-10 py-6 text-right"
                              variant="default"
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

          <button
            type="button"
            onClick={() => instanceRef.current?.next()}
            disabled={currentSlide === slideGroups.length - 1}
            aria-label={t("next")}
            className="absolute top-1/2 -right-20 -translate-y-1/2 z-10  p-3 transition cursor-pointer  disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Image
              src="/images/arrow-right-pink.svg"
              alt={t("next")}
              width={60}
              height={60}
            />
          </button>

          <div className="mt-6 flex justify-center gap-2">
            {slideGroups.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={`h-2 w-2 rounded-full transition ${
                  idx === currentSlide
                    ? "bg-primary w-10"
                    : "bg-primary/45 hover:bg-primary/80"
                }`}
                aria-label={`${t("prev")} ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
