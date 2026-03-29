"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import type {
  ChangeEvent,
  Dispatch,
  ReactNode,
  SetStateAction,
} from "react";
import { type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import { colVariants, itemVariants } from "@/components/ui/animations";
import { PhoneField } from "@/components/ui";

const inputCls =
  "w-full rounded-xl border border-[#F0F0F0] bg-white px-4 py-3 text-sm text-[#2C2C2C] placeholder:text-[#C4C4C4] focus:outline-none focus:ring-2 focus:ring-[#FFB24B] transition-all";

export type ShippingFormState = {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postalCode?: string;
};

type HookFormProps = {
  control: Control<ShippingFormState>;
  register: UseFormRegister<ShippingFormState>;
  errors: FieldErrors<ShippingFormState>;
  children?: ReactNode;
};

type LegacyFormProps = {
  form: ShippingFormState;
  setForm: Dispatch<SetStateAction<ShippingFormState>>;
  formErrors?: Partial<Record<keyof ShippingFormState, string>>;
  children?: ReactNode;
};

type ShippingFormProps = HookFormProps | LegacyFormProps;

function isHookFormProps(props: ShippingFormProps): props is HookFormProps {
  return "register" in props && typeof props.register === "function";
}

export function ShippingForm(props: ShippingFormProps) {
  const t = useTranslations("books");
  const isHookForm = isHookFormProps(props);
  const hookForm = props as HookFormProps;
  const legacyProps = props as LegacyFormProps;

  const set = (field: keyof ShippingFormState) => (e: ChangeEvent<HTMLInputElement>) => {
    if (!legacyProps?.setForm) return;
    legacyProps.setForm((prev: ShippingFormState) => ({ ...prev, [field]: e.target.value }));
  };

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
          {isHookForm ? (
            <>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.18 }}
                className={inputCls}
                placeholder={t("checkout.fullNamePlaceholder")}
                {...hookForm.register("fullName", {
                  required: "Full name is required",
                })}
              />
              {hookForm.errors.fullName && (
                <p className="text-xs text-red-500 ps-1">
                  {hookForm.errors.fullName.message}
                </p>
              )}
            </>
          ) : (
            <>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.18 }}
                className={inputCls}
                placeholder={t("checkout.fullNamePlaceholder")}
                value={legacyProps?.form.fullName ?? ""}
                onChange={set("fullName")}
              />
              {legacyProps?.formErrors?.fullName && (
                <p className="text-xs text-red-500 ps-1">
                  {legacyProps.formErrors.fullName}
                </p>
              )}
            </>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm sm:text-base font-semibold text-[#2C2C2C]">
            {t("checkout.phoneNumber")}
          </label>
          {isHookForm ? (
            <PhoneField
              name="phone"
              control={hookForm.control}
              label={t("checkout.phoneNumber")}
              showLabel={false}
              inputSize="lg"
              variant="pink"
              error={hookForm.errors.phone?.message as string | undefined}
              placeholder={t("checkout.phoneNumberPlaceholder")}
              defaultCountry="EG"
            />
          ) : (
            <>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.18 }}
                className={inputCls}
                placeholder={t("checkout.phoneNumberPlaceholder")}
                value={legacyProps?.form.phone ?? ""}
                onChange={set("phone")}
                type="tel"
              />
              {legacyProps?.formErrors?.phone && (
                <p className="text-xs text-red-500 ps-1">
                  {legacyProps.formErrors.phone}
                </p>
              )}
            </>
          )}
        </div>
      </motion.div>

      {/* Row 2 – Address */}
      <motion.div variants={itemVariants} className="space-y-2">
        <label className="block text-sm sm:text-base font-semibold text-[#2C2C2C]">
          {t("checkout.detailedAddress")}
        </label>
        {isHookForm ? (
          <>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.18 }}
              className={inputCls}
              placeholder={t("checkout.detailedAddressPlaceholder")}
              {...hookForm.register("address", {
                required: "Address is required",
              })}
            />
            {hookForm.errors.address && (
              <p className="text-xs text-red-500 ps-1">
                {hookForm.errors.address.message}
              </p>
            )}
          </>
        ) : (
          <>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.18 }}
              className={inputCls}
              placeholder={t("checkout.detailedAddressPlaceholder")}
              value={legacyProps?.form.address ?? ""}
              onChange={set("address")}
            />
            {legacyProps?.formErrors?.address && (
              <p className="text-xs text-red-500 ps-1">
                {legacyProps.formErrors.address}
              </p>
            )}
          </>
        )}
      </motion.div>

      {/* Row 3 – City + Postal code */}
      <motion.div variants={itemVariants} className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm sm:text-base font-semibold text-[#2C2C2C]">
            {t("checkout.city")}
          </label>
          {isHookForm ? (
            <>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.18 }}
                className={inputCls}
                placeholder={t("checkout.cityPlaceholder")}
                {...hookForm.register("city", {
                  required: "City is required",
                })}
              />
              {hookForm.errors.city && (
                <p className="text-xs text-red-500 ps-1">
                  {hookForm.errors.city.message}
                </p>
              )}
            </>
          ) : (
            <>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.18 }}
                className={inputCls}
                placeholder={t("checkout.cityPlaceholder")}
                value={legacyProps?.form.city ?? ""}
                onChange={set("city")}
              />
              {legacyProps?.formErrors?.city && (
                <p className="text-xs text-red-500 ps-1">
                  {legacyProps.formErrors.city}
                </p>
              )}
            </>
          )}
        </div>
        <div className="space-y-2">
          <label className="block text-sm sm:text-base font-semibold text-[#2C2C2C]">
            {t("checkout.postalCode")}
          </label>
          {isHookForm ? (
            <motion.input
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.18 }}
              className={inputCls}
              placeholder={t("checkout.postalCodePlaceholder")}
              {...hookForm.register("postalCode")}
            />
          ) : (
            <motion.input
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.18 }}
              className={inputCls}
              placeholder={t("checkout.postalCodePlaceholder")}
              value={legacyProps?.form.postalCode ?? ""}
              onChange={set("postalCode")}
            />
          )}
        </div>
      </motion.div>

      {/* Optional Footer Slot */}
      {props.children && (
        <motion.div variants={itemVariants} className="pt-2">
          {props.children}
        </motion.div>
      )}
    </motion.div>
  );
}
