"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import type { Book } from "@/lib/books";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  sectionVariants,
  cardVariants,
  CustomizationForm,
  BookPreviewSlider,
} from "./customize";
import { useCartStore } from "@/store/useCartStore";

type BookCustomizeProps = {
  book: Book;
  locale: string;
};

function parsePrice(price: string) {
  const match = price.match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : 0;
}

export function BookCustomize({ book, locale }: BookCustomizeProps) {
  const t = useTranslations("books");
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const [childName, setChildName] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [coverType, setCoverType] = useState<"sturdy" | "luxury" | "">("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideDir, setSlideDir] = useState(1);

  // Load from cart if editing
  useEffect(() => {
    const editJson = localStorage.getItem("taleora_cart_edit");
    if (!editJson) return;

    try {
      const editData = JSON.parse(editJson) as {
        cartIndex?: number;
        bookId?: number;
        name?: string;
        cover?: "sturdy" | "luxury" | "";
        photo?: string;
      };

      if (editData.bookId !== book.id) return;

      if (typeof editData.name === "string") setChildName(editData.name);
      if (typeof editData.cover === "string") setCoverType(editData.cover);
      if (typeof editData.photo === "string") setPhotoPreview(editData.photo);
      if (typeof editData.cartIndex === "number") setEditIndex(editData.cartIndex);
    } catch {
      // ignore
    }
  }, [book.id]);

  // Pricing calculations
  const basePrice = useMemo(() => parsePrice(book.price), [book.price]);
  const coverPrice = useMemo(() => {
    let total = 0;
    if (coverType === "sturdy") total += 10.29;
    if (coverType === "luxury") total += 22.29;
    return total;
  }, [coverType]);
  const totalPrice = useMemo(
    () => basePrice + coverPrice,
    [basePrice, coverPrice],
  );

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  // Image slider images generator
  const sliderImages = useMemo(() => {
    const images: string[] = [];
    if (photoPreview) images.push(photoPreview); // first: child photo
    images.push("/images/story-img.jpg"); // second: default story image
    return images;
  }, [photoPreview]);

  // File handling
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setPhotoFile(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
      setActiveSlide(0);
    } else {
      setPhotoPreview(null);
    }
  };

  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  // Convert File to Base64
  const fileToDataUrl = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const goToSlide = (next: number) => {
    setSlideDir(next > activeSlide ? 1 : -1);
    setActiveSlide(next);
  };

  // Fetch Blob from Local Blob URL to convert to Base64
  const getDataUrlFromUrl = async (url: string) => {
    if (url.startsWith("data:")) return url;

    const res = await fetch(url);
    const blob = await res.blob();

    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // Submit
  const addToCart = async () => {
    const photoDataUrl =
      photoFile != null
        ? await fileToDataUrl(photoFile)
        : photoPreview
        ? await getDataUrlFromUrl(photoPreview)
        : "";

    const item = {
      bookId: book.id,
      bookKey: book.key,
      bookTitle: t(`${book.key}.title`),
      bookImage: book.image,
      name: childName,
      photo: photoDataUrl,
      cover: coverType as "sturdy" | "luxury" | "",
      totalPrice,
      date: new Date().toISOString(),
    };

    if (editIndex != null) {
      useCartStore.getState().updateCartItem(editIndex, item);
      localStorage.removeItem("taleora_cart_edit");
    } else {
      useCartStore.getState().addToCart(item);
    }

    toast.success(
      editIndex != null
        ? t("customize.updatedToast")
        : t("customize.addedToast"),
    );

    router.push(`/${locale}/cart`);
  };

  const isComplete = !!childName && !!photoFile && !!coverType;

  // Disable motion variants if user prefers reduced motion
  const motionProps = shouldReduceMotion
    ? {}
    : { variants: sectionVariants, initial: "hidden", animate: "visible" };

  return (
    <motion.section className="px-4 py-14 sm:py-20" {...motionProps}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="grid gap-10 md:grid-cols-2 items-start"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left: Customization form */}
          <motion.div
            className="space-y-6 rounded-3xl border border-[#F4F4F4] p-8 shadow-md "
            variants={cardVariants}
          >
            <CustomizationForm
              bookKey={book.key}
              childName={childName}
              setChildName={setChildName}
              photoPreview={photoPreview}
              onFileChange={onFileChange}
              removePhoto={removePhoto}
              coverType={coverType}
              setCoverType={setCoverType}
              basePrice={basePrice}
              coverPrice={coverPrice}
              totalPrice={totalPrice}
              isComplete={isComplete}
              addToCart={addToCart}
              t={t}
            />
          </motion.div>

          {/* Right: Preview Slider */}
          <motion.div
            className="space-y-4 md:sticky md:top-24"
            variants={cardVariants}
          >
            <AnimatePresence>
              {photoPreview && (
                <motion.h4
                  className="text-sm sm:text-base font-medium text-center text-[#646464]"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {t("customize.bookPreview")}
                </motion.h4>
              )}
            </AnimatePresence>

            <BookPreviewSlider
              photoPreview={photoPreview}
              activeSlide={activeSlide}
              slideDir={slideDir}
              sliderImages={sliderImages}
              goToSlide={goToSlide}
              t={t}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
