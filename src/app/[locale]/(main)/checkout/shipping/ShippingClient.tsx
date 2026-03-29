"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShippingForm } from "./components/ShippingForm";
import { CheckoutSummary } from "./components/CheckoutSummary";
import { getShippingSchema, type ShippingFormValues } from "@/lib/shipping-schemas";

export function ShippingClient() {
  const t = useTranslations("books");
  const shippingSchema = getShippingSchema(t);

  const {
    register,
    control,
    formState: { errors, isValid },
  } = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
    },
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_420px] items-start">
      <ShippingForm
        control={control}
        register={register}
        errors={errors}
      />
      <CheckoutSummary isFormValid={isValid} shippingFee={25} />
    </div>
  );
}
