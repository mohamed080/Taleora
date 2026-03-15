"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { getBookById } from "@/lib/books";
import { StaggerItem } from "@/components/ui/animations";

export function CartItemCard({
  item,
  index,
  locale,
  t,
  onEdit,
  onDelete,
}: {
  item: any;
  index: number;
  locale: string;
  t: ReturnType<typeof useTranslations>;
  onEdit: (i: number) => void;
  onDelete: (i: number) => void;
}) {
  const book = getBookById(item.bookId);

  const bookTitle =
    (item.bookKey && t(`${item.bookKey}.title`)) ||
    item.bookTitle ||
    (book && t(`${book.key}.title`)) ||
    t("cart.bookId", { id: item.bookId ?? "?" });

  const imageSrc =
    item.photo?.trim() ||
    item.bookImage?.trim() ||
    book?.image ||
    "/images/story-img.jpg";

  const isDataUrl =
    typeof imageSrc === "string" && imageSrc.startsWith("data:");

  const coverLabel =
    item.cover === "sturdy"
      ? t("customize.coverSturdy")
      : item.cover === "luxury"
        ? t("customize.coverLuxury")
        : t("cart.none");

  return (
    <StaggerItem
      layout
      exit="exit"
      className="rounded-3xl shadow-xl border border-muted p-5 sm:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Book info */}
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* Cover image */}
          <div className="shrink-0">
            {isDataUrl ? (
              <Image
                src={imageSrc}
                alt={t("cart.imageAlt")}
                width={62}
                height={89}
                className="rounded-xl object-cover"
                draggable={false}
              />
            ) : (
              <Image
                src={imageSrc}
                alt={t("cart.imageAlt")}
                width={62}
                height={89}
                className="rounded-xl object-cover"
                draggable={false}
              />
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-1 min-w-0 flex-1">
            <h4 className="text-sm sm:text-base font-bold truncate">
              {bookTitle}
            </h4>

            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <p className="text-xs sm:text-sm text-[#6F6F6F]">
                <strong>{t("cart.childNameLabel")}:</strong>{" "}
                {item.name || t("cart.unnamed")}
              </p>
              <p className="text-xs sm:text-sm text-[#6F6F6F]">
                <strong>{t("cart.coverTypeLabel")}:</strong> {coverLabel}
              </p>
            </div>

            <div className="flex items-center justify-between mt-2">
              <span className="text-sm sm:text-base font-bold text-primary">
                {(item.totalPrice).toFixed(2)} EGP
              </span>
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-xs sm:text-sm underline font-semibold text-[#6F6F6F] cursor-pointer"
                onClick={() => onEdit(index)}
              >
                {t("customize.edit")}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Delete */}
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#C2C2C2" }}
          whileTap={{ scale: 0.9 }}
          className="bg-[#D9D9D9] w-10 h-10 rounded-full flex justify-center items-center cursor-pointer text-white text-base transition-colors shrink-0 self-start sm:self-auto"
          onClick={() => onDelete(index)}
          aria-label={t("cart.deleteItemAlt", { title: bookTitle })}
        >
          <FaTrash />
        </motion.button>
      </div>
    </StaggerItem>
  );
}
