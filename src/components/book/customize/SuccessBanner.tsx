"use client";

import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { successBannerVariants } from "./customize-animations";

export function SuccessBanner({
  removePhoto,
  t,
}: {
  removePhoto: () => void;
  t: any;
}) {
  return (
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
  );
}
