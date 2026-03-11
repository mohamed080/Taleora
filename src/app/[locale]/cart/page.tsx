"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  CartSkeleton,
  EmptyCart,
  CartItemCard,
  OrderSummary,
  pageVariants,
  colVariants,
} from "./components";

// ── Imported Store ──────────────────────────────────────────────────────────
import { useCartStore } from "@/store/useCartStore";

// ── Page ────────────────────────────────────────────────────────────────────
export default function Page() {
  const params = useParams() as { locale?: string };
  const locale = params?.locale ?? "en";
  const router = useRouter();
  const t = useTranslations("books");
  const [couponCode, setCouponCode] = useState("");
  const [itemToDelete, setItemToDelete] = useState<null | {
    index: number;
    title: string;
  }>(null);

  // ── Fix: initialise directly from localStorage, no useEffect / isLoading ─
  // SSR returns [] (window is undefined); client hydrates with real data.
  const [mounted, setMounted] = useState(false);
  const cart = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  useEffect(() => {
    setMounted(true); // single re-render on mount
  }, []);

  const total = useCartStore((state) => state.getSubtotal());
  const itemCount = cart.length;

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleDelete = (index: number) => {
    const item = cart[index];
    setItemToDelete({
      index,
      title:
        (item?.bookKey && t(`${item.bookKey}.title`)) ||
        item?.bookTitle ||
        t("cart.bookId", { id: item?.bookId ?? "?" }),
    });
  };

  const handleConfirmDelete = () => {
    if (!itemToDelete) return;
    const item = cart[itemToDelete.index];
    if (item && item.date) {
      removeFromCart(item.date);
      toast.success(t("cart.deletedToast", { title: itemToDelete.title }));
    }
    setItemToDelete(null);
  };

  const handleEdit = (index: number) => {
    const item = cart[index];
    if (!item) return;
    localStorage.setItem(
      "taleora_cart_edit",
      JSON.stringify({ ...item, cartIndex: index }),
    );
    router.push(`/${locale}/books/${item.bookId}/customize`);
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  if (!mounted) return <CartSkeleton />;
  if (!itemCount) return <EmptyCart locale={locale} t={t} />;

  return (
    <motion.section
      className="px-4 py-14 sm:py-20"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="grid gap-7 lg:grid-cols-[60%_40%] items-start"
          variants={pageVariants}
        >
          {/* Left — cart items */}
          <motion.div
            className="space-y-6 rounded-3xl border border-[#F4F4F4] p-4 sm:p-8 shadow-md"
            variants={colVariants}
          >
            {/* Header */}
            <div className="flex flex-wrap items-center gap-3 justify-between">
              <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                {t("cart.title")}
              </h4>
              <Button
                asChild
                variant="default"
                size="lg"
                className="px-4 h-10 text-sm"
              >
                <Link href={`/${locale}/books`}>
                  {t("cart.continueShopping")}
                </Link>
              </Button>
            </div>

            <span className="inline-flex w-full border-b-2 border-[#F2F2F2]" />

            {/* Items */}
            <motion.div className="space-y-5" variants={pageVariants}>
              <AnimatePresence initial={false}>
                {cart.map((item, index) => (
                  <CartItemCard
                    key={item.date ?? index}
                    item={item}
                    index={index}
                    locale={locale}
                    t={t}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Right — order summary */}
          <OrderSummary
            total={total}
            itemCount={itemCount}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            t={t}
            locale={locale}
          />
        </motion.div>
      </div>

      {/* Delete confirmation dialog */}
      <AnimatePresence>
        {itemToDelete && (
          <AlertDialog
            open={Boolean(itemToDelete)}
            onOpenChange={(open) => {
              if (!open) setItemToDelete(null);
            }}
          >
            <AlertDialogContent asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-montserrat!">
                    {t("cart.confirmDeleteTitle")}
                  </AlertDialogTitle>

                  <AlertDialogDescription>
                    {t("cart.confirmDeleteBody", {
                      title: itemToDelete?.title ?? "",
                    })}
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setItemToDelete(null)}>
                    {t("cart.cancel")}
                  </AlertDialogCancel>

                  <AlertDialogAction
                    onClick={handleConfirmDelete}
                    variant="destructive"
                  >
                    {t("cart.delete")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </motion.div>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
