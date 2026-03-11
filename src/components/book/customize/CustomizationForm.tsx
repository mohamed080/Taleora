"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaCartPlus } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { itemVariants } from "./customize-animations";
import { SuccessBanner } from "./SuccessBanner";
import { ImageUploadEmpty } from "./ImageUploadEmpty";
import { PriceSummary } from "./PriceSummary";

export function CustomizationForm({
  bookKey,
  childName,
  setChildName,
  photoPreview,
  onFileChange,
  removePhoto,
  coverType,
  setCoverType,
  basePrice,
  coverPrice,
  totalPrice,
  isComplete,
  addToCart,
  t,
}: {
  bookKey: string;
  childName: string;
  setChildName: (v: string) => void;
  photoPreview: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removePhoto: () => void;
  coverType: "sturdy" | "luxury" | "";
  setCoverType: (v: "sturdy" | "luxury" | "") => void;
  basePrice: number;
  coverPrice: number;
  totalPrice: number;
  isComplete: boolean;
  addToCart: () => void;
  t: any;
}) {
  return (
    <>
      <motion.h4
        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground"
        variants={itemVariants}
      >
        {t(`${bookKey}.title`)}
      </motion.h4>

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
            <SuccessBanner removePhoto={removePhoto} t={t} />
          ) : (
            <ImageUploadEmpty onFileChange={onFileChange} t={t} />
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
                {type === "sturdy"
                  ? t("customize.coverSturdy")
                  : t("customize.coverLuxury")}
              </span>
            </div>
            <span className="text-sm sm:text-base font-medium">
              {type === "sturdy"
                ? t("customize.coverSturdyPrice")
                : t("customize.coverLuxuryPrice")}
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
      <PriceSummary
        basePrice={basePrice}
        coverPrice={coverPrice}
        totalPrice={totalPrice}
        t={t}
      />

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
    </>
  );
}
