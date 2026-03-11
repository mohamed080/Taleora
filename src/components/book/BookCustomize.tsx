"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import type { Book } from "@/lib/books";
import { FaCartPlus, FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { type Variants } from "framer-motion";

type BookCustomizeProps = {
  book: Book;
  locale: string;
};

function parsePrice(price: string) {
  const match = price.match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : 0;
}

// ── Animation Variants

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const fadeScaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const imageSlideVariants: Variants = {

  enter: (dir: number) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.28, ease: "easeIn" },
  }),
};

const successBannerVariants: Variants = {
  hidden: { opacity: 0, y: -10, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.97,
    transition: { duration: 0.2 },
  },
};

const priceVariants: Variants = {
  initial: { opacity: 0, y: -6 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export function BookCustomize({ book, locale }: BookCustomizeProps) {
  const t = useTranslations("books");
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const [childName, setChildName] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [coverType, setCoverType] = useState<"sturdy" | "luxury" | "">("");
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideDir, setSlideDir] = useState(1);

  const basePrice = useMemo(() => parsePrice(book.price), [book.price]);
  const coverPrice = useMemo(() => {
    let total = 0;
    if (coverType === "sturdy") total += 10.29;
    if (coverType === "luxury") total += 22.29;
    return total;
  }, [coverType]);
  const totalPrice = useMemo(
    () => (basePrice + coverPrice).toFixed(2),
    [basePrice, coverPrice],
  );

  useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  const sliderImages = useMemo(() => {
    const images: string[] = [];

    if (photoPreview) images.push(photoPreview); // first: child photo
    images.push("/images/story-img.jpg"); // second: default story image

    return images;
  }, [photoPreview]);

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

    const goToSlide = (next: number) => {
    setSlideDir(next > activeSlide ? 1 : -1);
    setActiveSlide(next);
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("taleora_cart") ?? "[]");
    cart.push({
      bookId: book.id,
      name: childName,
      photo: photoPreview,
      cover: coverType,
      totalPrice,
      date: new Date().toISOString(),
    });
    localStorage.setItem("taleora_cart", JSON.stringify(cart));
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
          className="grid gap-10 lg:grid-cols-2 items-start"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left: Customization form */}
          <motion.div
            className="space-y-6 rounded-3xl border border-[#F4F4F4] p-8 shadow-md "
            variants={cardVariants}
          >
            {/* Title */}
            <motion.h4
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground"
              variants={itemVariants}
            >
              {t(`${book.key}.title`)}
            </motion.h4>

            {/* Description */}
            <motion.p
              className="text-sm sm:text-base text-[#2C2C2C] leading-tight"
              variants={itemVariants}
            >
              {t("customize.description")}
            </motion.p>

            {/* Step 1 – Child name */}
            <motion.label className="block mb-4" variants={itemVariants}>
              <span className="block text-sm sm:text-base font-semibold text-[#2C2C2C] mb-3 ">
                {t("customize.stepChildName")}
              </span>
              <motion.input
                whileFocus={{ scale: 1.01, borderColor: "#FFB24B" }}
                transition={{ duration: 0.2 }}
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder={t("customize.childNamePlaceholder")}
                className="w-full rounded-lg border border-[#F4F4F4] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFB24B] transition-colors text-sm sm:text-base"
              />
            </motion.label>

            {/* Step 2 – Child photo */}

            <motion.div className="mb-4" variants={itemVariants}>
              <span className="block text-sm font-semibold text-[#2C2C2C] mb-3">
                {t("customize.stepChildPhoto")}
              </span>
              <AnimatePresence mode="wait">
                {photoPreview ? (
                  <motion.div
                    key="success"
                    variants={successBannerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex items-center justify-between rounded-xl border border-[#3BC216] bg-[#E4FFDC] px-4 py-3 text-sm text-success"
                  >
                    <div className="flex items-center gap-2">
                      <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                          delay: 0.1,
                        }}
                      >
                        <FaCheckCircle color="#3BC216" size={30} />
                      </motion.div>{" "}
                      <div className="-space-y-1">
                        <h5 className="text-[#187100] text-sm sm:text-base font-semibold">
                          {t("customize.photoSuccess")}
                        </h5>
                        <p className="text-[#29C000] text-sm sm:text-base">
                          {t("customize.photoSuccessHint")}
                        </p>
                      </div>
                    </div>
                    <motion.button
                      type="button"
                      onClick={removePhoto}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-sm sm:text-base underline text-[#898989] font-semibold cursor-pointer"
                    >
                      {t("customize.edit")}
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.label
                    key="upload"
                    variants={fadeScaleVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileHover={{ scale: 1.01, borderColor: "#f9a525" }}
                    className="relative flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-[#FFB24B] px-4 py-10 text-center bg-[#FEF9E3] transition-colors"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={onFileChange}
                    />
                    <div className="space-y-2">
                      <motion.div
                        className="flex items-center justify-center"
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 2.4,
                          ease: "easeInOut",
                        }}
                      >
                        <Image
                          src="/images/add-image.svg"
                          width={42}
                          height={42}
                          alt={t("customize.uploadPhoto")}
                        />
                      </motion.div>
                      <p className="text-sm sm:text-base font-medium text-[#FFB24B]">
                        {t("customize.uploadInstructions")}
                      </p>
                      <p className="text-xs sm:text-sm font-medium text-[#B3B3B3]">
                        {t("customize.uploadFormats")}
                      </p>
                    </div>
                  </motion.label>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Step 3 – Cover material */}
            <motion.div className="space-y-3" variants={itemVariants}>
              <span className="block text-sm sm:text-base font-semibold text-[#2C2C2C]">
                {t("customize.coverStep")}
              </span>
              {(["sturdy", "luxury"] as const).map((type) => (
                <motion.label
                  key={type}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all duration-200
                    ${
                      coverType === type
                        ? "border-[#FFB24B] bg-[#FEF9E3] text-[#FFB24B] shadow-sm"
                        : "border-[#F4F4F4] bg-white text-black"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="cover"
                      checked={coverType === type}
                      onChange={() => setCoverType(type)}
                      className="appearance-none w-5 h-5 border-3 border-[#A6A6A6] checked:border-[#FFB24B] rounded-sm bg-[#FCFCFC] shrink-0"
                    />
                    <span className="text-sm sm:text-base capitalize">
                      {type === "sturdy" ? t("customize.coverSturdy") : t("customize.coverLuxury")}
                    </span>
                  </div>
                  <span className="text-sm sm:text-base font-medium">
                    {type === "sturdy" ? t("customize.coverSturdyPrice") : t("customize.coverLuxuryPrice")}
                  </span>
                </motion.label>
              ))}
            </motion.div>

            {/* Divider */}
            <motion.span
              className="inline-flex w-full border-b-2 border-[#C2C2C2]"
              variants={itemVariants}
            />
            {/* Price summary */}

            <motion.div
              className="rounded-2xl bg-muted/50 p-5"
              variants={itemVariants}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-base">{t("customize.basePrice")}</span>
                <span className="font-semibold">{basePrice} EGP</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-base">{t("customize.coverOptions")}</span>
                <motion.span
                  key={coverPrice}
                  variants={priceVariants}
                  initial="initial"
                  animate="animate"
                  className="font-semibold text-sm sm:text-base"
                >
                  {coverPrice} EGP
                </motion.span>{" "}
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-muted pt-3">
                <span className="font-bold">{t("customize.total")}</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={totalPrice}
                    variants={priceVariants}
                    initial="initial"
                    animate="animate"
                    className="text-xl sm:text-2xl font-bold text-[#FFB24B]"
                  >
                    {totalPrice} EGP
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Add to cart */}
            <motion.div variants={itemVariants}>
              <motion.div
                whileHover={isComplete ? { scale: 1.02 } : {}}
                whileTap={isComplete ? { scale: 0.98 } : {}}
              >
                <Button
                  className="w-full py-7 text-sm sm:text-base disabled:pointer-events-auto disabled:cursor-not-allowed!"
                  variant="gradient"
                  size="lg"
                  onClick={addToCart}
                  disabled={!isComplete}
                >
                  <FaCartPlus className="mr-2" />
                  {t("customize.addToCart")}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: Preview */}
          <motion.div
            className="space-y-4 lg:sticky lg:top-24"
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

            <div className="rounded-3xl border border-muted p-4 shadow-xl">
              <AnimatePresence>
                {!photoPreview ? (
                  <motion.div
                    key="placeholder"
                    variants={fadeScaleVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col gap-5 items-center justify-center h-64 sm:h-80 lg:h-118 text-center px-6"
                  >
                    <motion.div
                      animate={{
                        y: [0, -8, 0],
                        rotate: [0, 2, -2, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3.5,
                        ease: "easeInOut",
                      }}
                    >
                      <Image
                        src="/images/Storytelling.svg"
                        alt="Storytelling icon"
                        width={90}
                        height={90}
                        className="object-cover"
                        priority
                      />
                    </motion.div>
                    <h4 className="text-[#ADADAD] text-lg sm:text-xl md:text-2xl max-w-xs">
                      {t("customize.previewEmpty")}
                    </h4>
                  </motion.div>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden bg-black/5 h-118.25">
                    <AnimatePresence custom={slideDir} mode="wait">
                      <motion.div
                        key={activeSlide}
                        custom={slideDir}
                        variants={imageSlideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute inset-0"
                      >
                        <Image
                          src={sliderImages[activeSlide]}
                          alt="Book preview"
                          fill
                          className="object-cover"
                          priority
                          unoptimized={sliderImages[activeSlide].startsWith(
                            "blob:",
                          )}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Slider controls */}
            <AnimatePresence>
              {photoPreview && sliderImages.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center justify-center gap-6 bg-white rounded-3xl shadow-xl px-8 h-17.5 max-w-64 mx-auto mt-4"
                >
                  {/* Previous */}
                  <motion.button
                    type="button"
                    onClick={() =>
                      goToSlide(
                        (activeSlide - 1 + sliderImages.length) %
                          sliderImages.length,
                      )
                    }
                    disabled={activeSlide === 0}
                    whileHover={activeSlide !== 0 ? { scale: 1.15, x: -2 } : {}}
                    whileTap={activeSlide !== 0 ? { scale: 0.9 } : {}}
                    className="inline-flex h-10 w-10 items-center justify-center cursor-pointer disabled:cursor-not-allowed"
                  >
                    <Image
                      src={
                        activeSlide === 0
                          ? "/images/arrow-left-gray.svg"
                          : "/images/arrow-left-pink-l.svg"
                      }
                      alt="Previous"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </motion.button>

                  {/* Label */}
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeSlide}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm sm:text-base font-medium min-w-[48px] text-center"
                    >
                      {activeSlide === 0 ? t("customize.previewCover") : `${t("customize.previewPage")} ${activeSlide}`}
                    </motion.span>
                  </AnimatePresence>

                  {/* Next */}
                  <motion.button
                    type="button"
                    onClick={() =>
                      goToSlide((activeSlide + 1) % sliderImages.length)
                    }
                    disabled={activeSlide === sliderImages.length - 1}
                    whileHover={
                      activeSlide !== sliderImages.length - 1
                        ? { scale: 1.15, x: 2 }
                        : {}
                    }
                    whileTap={
                      activeSlide !== sliderImages.length - 1
                        ? { scale: 0.9 }
                        : {}
                    }
                    className="inline-flex h-10 w-10 items-center justify-center cursor-pointer disabled:cursor-not-allowed"
                  >
                    <Image
                      src={
                        activeSlide === sliderImages.length - 1
                          ? "/images/arrow-right-gray.svg"
                          : "/images/arrow-right-pink-l.svg"
                      }
                      alt="Next"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

             {/* Dot indicators */}
            <AnimatePresence>
              {photoPreview && sliderImages.length > 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center gap-2 pt-1"
                >
                  {sliderImages.map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => goToSlide(i)}
                      animate={{
                        width: i === activeSlide ? 20 : 8,
                        backgroundColor: i === activeSlide ? "#FF6DCA" : "#D4D4D4",
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="h-2 rounded-full"
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
