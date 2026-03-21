"use client";

import { useTranslations } from "next-intl";
import { OrderSummary as BaseOrderSummary } from "./components";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";

type CartSummaryProps = {
  locale: string;
};

export function CartSummary({ locale }: CartSummaryProps) {
  const t = useTranslations("books");
  const [couponCode, setCouponCode] = useState("");
  
  const cart = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.getSubtotal());
  const itemCount = cart.length;

  return (
    <BaseOrderSummary
      total={total}
      itemCount={itemCount}
      couponCode={couponCode}
      setCouponCode={setCouponCode}
      t={t}
      locale={locale}
    />
  );
}
