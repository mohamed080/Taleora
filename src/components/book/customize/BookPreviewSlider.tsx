"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { imageSlideVariants } from "./customize-animations";
import { FadeIn, SlideUp, EASE_OUT } from "@/components/ui/animations";

export function BookPreviewSlider({
  photoPreview,
  activeSlide,
  slideDir,
  sliderImages,
  goToSlide,
  t,
}: {
  photoPreview: string | null;
  activeSlide: number;
  slideDir: number;
  sliderImages: string[];
  goToSlide: (next: number) => void;
  t: any;
}) {
  return (
    <>
      <div className="rounded-3xl border border-muted p-4 shadow-xl">
        <AnimatePresence>
          {!photoPreview ? (
            <FadeIn
              key="placeholder"
              scale={0.9}
              className="flex flex-col gap-5 items-center justify-center h-64 sm:h-80 md:h-118 text-center px-6"
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
            </FadeIn>
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
                    unoptimized={sliderImages[activeSlide].startsWith("blob:")}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </AnimatePresence>
      </div>

      {photoPreview && sliderImages.length > 1 && (
        <SlideUp
          delay={0.1}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center justify-center gap-6 bg-white rounded-3xl shadow-xl px-8 h-17.5 max-w-64 mx-auto mt-4">
            {/* Previous */}
            <motion.button
              type="button"
              onClick={() =>
                goToSlide(
                  (activeSlide - 1 + sliderImages.length) % sliderImages.length,
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
                transition={{ duration: 0.2, ease: EASE_OUT }}
                className="text-sm sm:text-base font-medium min-w-[48px] text-center"
              >
                {activeSlide === 0
                  ? t("customize.previewCover")
                  : `${t("customize.previewPage")} ${activeSlide}`}
              </motion.span>
            </AnimatePresence>

            {/* Next */}
            <motion.button
              type="button"
              onClick={() => goToSlide((activeSlide + 1) % sliderImages.length)}
              disabled={activeSlide === sliderImages.length - 1}
              whileHover={
                activeSlide !== sliderImages.length - 1
                  ? { scale: 1.15, x: 2 }
                  : {}
              }
              whileTap={
                activeSlide !== sliderImages.length - 1 ? { scale: 0.9 } : {}
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
          </div>

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
                transition={{ duration: 0.3, ease: EASE_OUT }}
                className="h-2 rounded-full cursor-pointer"
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </motion.div>
        </SlideUp>
      )}
    </>
  );
}
