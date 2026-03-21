"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import type { Dispatch, SetStateAction, ChangeEvent } from "react";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
};

const colVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const inputCls =
  "w-full rounded-xl border border-[#F0F0F0] bg-white px-4 py-3 text-sm text-[#2C2C2C] placeholder:text-[#C4C4C4] focus:outline-none focus:ring-2 focus:ring-[#FFB24B] transition-all";

export type ShippingFormState = {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
};

type ShippingFormProps = {
  form: ShippingFormState;
  setForm: Dispatch<SetStateAction<ShippingFormState>>;
};

export function ShippingForm({ form, setForm }: ShippingFormProps) {
  const t = useTranslations("books");

  const set = (field: keyof ShippingFormState) => (e: ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <motion.div
      variants={colVariants}
      className="min-w-0 rounded-3xl border border-[#F0F0F0] bg-white p-6 sm:p-8 shadow-md space-y-7"
    >
      {/* Title */}
      <motion.div variants={itemVariants} className="flex items-center gap-3">
        <Image
          src="/images/parachute.svg"
          width={30}
          height={30}
          alt="parachute"
        />
        <h4 className="text-xl sm:text-2xl font-bold text-black">
          {t("checkout.shippingInfo")}
        </h4>
      </motion.div>

      <span className="inline-flex w-full border-b border-[#F9F9F9]" />

      {/* Row 1 – Full name + Phone */}
      <motion.div variants={itemVariants} className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm sm:text-base font-semibold text-[#2C2C2C]">
            {t("checkout.fullName")}
          </label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.18 }}
            className={inputCls}
            placeholder={t("checkout.fullNamePlaceholder")}
            value={form.fullName}
            onChange={set("fullName")}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm sm:text-base font-semibold text-[#2C2C2C]">
            {t("checkout.phoneNumber")}
          </label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.18 }}
            className={inputCls}
            placeholder={t("checkout.phoneNumberPlaceholder")}
            value={form.phone}
            onChange={set("phone")}
            type="tel"
          />
        </div>
      </motion.div>

      {/* Row 2 – Address */}
      <motion.div variants={itemVariants} className="space-y-2">
        <label className="block text-sm sm:text-base font-semibold text-[#2C2C2C]">
          {t("checkout.detailedAddress")}
        </label>
        <motion.input
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.18 }}
          className={inputCls}
          placeholder={t("checkout.detailedAddressPlaceholder")}
          value={form.address}
          onChange={set("address")}
        />
      </motion.div>

      {/* Row 3 – City + Postal code */}
      <motion.div variants={itemVariants} className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm sm:text-base font-semibold text-[#2C2C2C]">
            {t("checkout.city")}
          </label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.18 }}
            className={inputCls}
            placeholder={t("checkout.cityPlaceholder")}
            value={form.city}
            onChange={set("city")}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm sm:text-base font-semibold text-[#2C2C2C]">
            {t("checkout.postalCode")}
          </label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.18 }}
            className={inputCls}
            placeholder={t("checkout.postalCodePlaceholder")}
            value={form.postalCode}
            onChange={set("postalCode")}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
