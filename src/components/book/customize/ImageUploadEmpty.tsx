"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeScaleVariants } from "./customize-animations";

export function ImageUploadEmpty({
  onFileChange,
  t,
}: {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  t: any;
}) {
  return (
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
  );
}
