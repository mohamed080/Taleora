"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
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

import { useCartStore } from "@/store/useCartStore";

type CartClientProps = {
  locale: string;
};

export function CartClient({ locale }: CartClientProps) {
  const router = useRouter();
  const t = useTranslations("books");

  const [couponCode, setCouponCode] = useState("");
  const [itemToDelete, setItemToDelete] = useState<null | {
    index: number;
    title: string;
  }>(null);

  const [mounted, setMounted] = useState(false);
  const cart = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  useEffect(() => {
    setMounted(true);
  }, []);

  const total = useCartStore((state) => state.getSubtotal());
  const itemCount = cart.length;

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
      JSON.stringify({ ...item, cartIndex: index })
    );
    router.push(`/${locale}/books/${item.bookId}/customize`);
  };

  // Prevent layout shift/hydration bugs
  if (!mounted) return <CartSkeleton />;
  if (!itemCount) return <EmptyCart locale={locale} t={t} />;

  return (
    <>
      {/* Items List */}
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

                  <AlertDialogAction onClick={handleConfirmDelete} variant="destructive">
                    {t("cart.delete")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </motion.div>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </AnimatePresence>
    </>
  );
}
