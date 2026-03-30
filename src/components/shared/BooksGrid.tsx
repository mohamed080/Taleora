"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { Book } from "@/lib/books";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 1,
    },
  },
};

export function BooksGrid({
  books,
  locale,
  namespace = "books",
  itemHref,
}: {
  books: Book[];
  locale: string;
  namespace?: string;
  itemHref?: string | ((item: Book) => string);
}) {
  const t = useTranslations(namespace);

  const buildHref = (item: Book) => {
    if (typeof itemHref === "function") {
      return itemHref(item);
    }

    if (itemHref) {
      return itemHref
        .replace(/:id/g, String(item.id))
        .replace(/:locale/g, locale)
        .replace(/:key/g, item.key);
    }

    return `/${locale}/books/${item.id}`;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-y-7 md:grid-cols-2 md:gap-5.25 lg:grid-cols-3 lg:gap-5.25 xl:grid-cols-[repeat(3,390px)] xl:justify-between xl:gap-x-0 w-full"
    >
      {books.map((book) => (
        <motion.div
          key={book.id}
          variants={cardVariants}
          whileHover={{ y: -8 }}
          className="group relative flex flex-col w-full mx-auto max-w-89.5 space-y-4 lg:mx-0 lg:max-w-none xl-[390px] items-start pb-6 md:pb-8 transition-all duration-300 ease-out"
        >
          {/* Image Container */}
          <Link
            href={buildHref(book)}
            className="block relative xl:w-97.5 xl:h-97.5 aspect-3/4 rounded-tr-md rounded-br-md w-full filter filter-[drop-shadow(-12px_12px_8px_rgba(0,0,0,0.5))] transform-[perspective(1000px)_rotateY(3deg)] overflow-hidden mb-5 bg-[#F9F9F9]"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full  bg-zinc-100"
            >
              <Image
                src={book.image}
                alt={t(`${book.key}.title`)}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                priority
              />
            </motion.div>

            {/* Quick View Overlay (Desktop only) */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center pointer-events-none">
              <span className="bg-white text-black text-sm font-bold py-2 px-4 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                {t("viewDetails")}
              </span>
            </div>
          </Link>

          {/* Book Info */}
          <div className="flex flex-col flex-1">
            <div className="flex items-start justify-between gap-2 mb-2">
              <Link href={buildHref(book)}>
                <h3 className="font-bold text-lg sm:text-xl text-[#1A1A1A] line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                  {t(`${book.key}.title`)}
                </h3>
              </Link>
            </div>

            <p className="text-base text-[#6F6F6F] line-clamp-2 flex-1 mt-1">
              {t(`${book.key}.subtitle`)}
            </p>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-[#ACACAC] font-medium text-[22px] leading-11 tracking-[-0.3px]">
                {t("from")}
              </span>
              <span className="text-primary  font-bold text-lg sm:text-[22px] leading-5 tracking-[-0.05px]">
                {book.price}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
