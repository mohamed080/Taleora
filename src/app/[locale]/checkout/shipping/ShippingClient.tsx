"use client";

import { useEffect, useState } from "react";
import { ShippingForm, type ShippingFormState } from "./components/ShippingForm";
import { CheckoutSummary } from "./components/CheckoutSummary";

export function ShippingClient() {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState<ShippingFormState>({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const isFormValid =
    form.fullName.trim() !== "" &&
    form.phone.trim() !== "" &&
    form.address.trim() !== "" &&
    form.city.trim() !== "";

  // Make sure hydration matches
  if (!mounted) {
    return (
      <div className="grid gap-6 lg:grid-cols-[1fr_420px] items-start opacity-0">
        <ShippingForm form={form} setForm={setForm} />
        <CheckoutSummary isFormValid={false} shippingFee={25} />
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_420px] items-start">
      <ShippingForm form={form} setForm={setForm} />
      <CheckoutSummary isFormValid={isFormValid} shippingFee={25} />
    </div>
  );
}
