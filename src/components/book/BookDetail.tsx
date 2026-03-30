"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { AiFillStar } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import type { Book } from "@/lib/books";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";

type BookDetailProps = {
  book: Book;
  locale: string;
  namespace?: "books" | "stickers";
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const thumbnails = [
  "/images/book-d.png",
  "/images/book-d.png",
  "/images/book-d.png",
  "/images/book-d.png",
];

export function BookDetail({ book, locale, namespace = "books" }: BookDetailProps) {
  const t = useTranslations(namespace);
  const common = useTranslations("books");
  const [activeImg, setActiveImg] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="px-4 py-14 sm:py-20" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2 items-start">
          {/* ── Image panel ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0}
            className="flex flex-col-reverse sm:flex-row  gap-3 sm:gap-6 items-center h-full"
          >
            {/* Thumbnails column */}
            <div className="flex flex-row sm:flex-col gap-4">
              {thumbnails.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImg(i)}
                  className={`rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all duration-200 focus:outline-none
                    ${
                      activeImg === i
                        ? "border-primary shadow-md scale-105"
                        : "border-transparent opacity-60 hover:opacity-90"
                    }`}
                >
                  <Image
                    src={src}
                    alt={`thumbnail ${i + 1}`}
                    width={80}
                    height={90}
                    className="w-15 sm:w-18 lg:w-22 h-auto object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImg}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Image
                    src={thumbnails[activeImg]}
                    alt={common("imageAlt")}
                    width={436}
                    height={444}
                    className="object-cover h-full flex-1 sm:w-full"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Details */}
          <div className="space-y-2">
            <motion.h4
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={1}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground"
            >
              {t(`${book.key}.title`)}
            </motion.h4>

            {/* Rating */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={2}
              className="flex flex-wrap items-center gap-2"
            >
              <div
                className="flex items-center gap-1 text-[#F5C15E] shadow-md rounded-full px-2 py-1 text-base sm:text-lg"
                aria-label={common("ratingAlt")}
              >
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar className="opacity-30" />
              </div>
              <span className="text-xs sm:text-sm text-gray font-medium">
                {t(`${book.key}.sold`)}
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={3}
              className="text-sm sm:text-base text-[#2C2C2C]"
            >
              {t(`${book.key}.description`)}
            </motion.p>

            {/* Price + payment icons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={4}
              className="flex justify-between items-center flex-wrap gap-3"
            >
              <p className="text-2xl sm:text-3xl font-bold text-primary">
                {book.price}
              </p>
              <Image
                src="/images/visa.png"
                alt={common("coinAlt")}
                width={172}
                height={28}
                className="h-6 sm:h-7 w-auto object-contain"
                priority
              />
            </motion.div>

            {/* CTA */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={5}
            >
              <Button
                asChild
                className="w-full py-5 sm:py-6 text-sm sm:text-base"
                variant="gradient"
                size="lg"
              >
                <Link href={`/${locale}/${namespace}/${book.id}/customize`}>{common("personalize")}</Link>
              </Button>
            </motion.div>

            <motion.span
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={6}
              className="inline-flex w-full border-b border-[#C2C2C2]"
            />
            {/* Features */}
            <motion.ul
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={7}
              className="list-disc pl-5 text-sm sm:text-base text-[#616161]"
            >
              {book.features?.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
