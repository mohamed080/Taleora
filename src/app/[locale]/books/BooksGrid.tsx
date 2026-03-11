"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import type { Book } from "@/lib/books";
import { FiArrowRight } from "react-icons/fi";

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

export function BooksGrid({ books, locale }: { books: Book[]; locale: string }) {
  const t = useTranslations("books");

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
    >
      {books.map((book) => (
        <motion.div
          key={book.id}
          variants={cardVariants}
          whileHover={{ y: -8 }}
          className="group relative flex flex-col bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-orange-50 hover:shadow-xl transition-all duration-300 ease-out"
        >
          {/* Image Container */}
          <Link
            href={`/${locale}/books/${book.id}`}
            className="block relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-5 bg-[#F9F9F9]"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full"
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
                View Details
              </span>
            </div>
          </Link>

          {/* Book Info */}
          <div className="flex flex-col flex-1">
            <div className="flex items-start justify-between gap-2 mb-2">
              <Link href={`/${locale}/books/${book.id}`}>
                <h3 className="font-bold text-lg sm:text-xl text-[#1A1A1A] line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                  {t(`${book.key}.title`)}
                </h3>
              </Link>
            </div>
            
            <p className="text-sm text-[#6F6F6F] line-clamp-2 mb-4 flex-1">
              {t(`${book.key}.subtitle`)}
            </p>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
              <span className="font-bold text-[#1A1A1A] text-lg">
                {book.price}
              </span>
              <Button
                asChild
                size="sm"
                className="rounded-full px-4 font-semibold gap-2 shadow-sm hover:shadow-md transition-shadow"
              >
                <Link href={`/${locale}/books/${book.id}/customize`}>
                  {t("personalize")}
                  <FiArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
