import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  bookId: number;
  bookKey: string;
  bookTitle: string;
  bookImage: string;
  name: string;
  photo: string;
  cover: "sturdy" | "luxury" | "";
  totalPrice: number;
  date: string;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  updateCartItem: (index: number, item: CartItem) => void;
  removeFromCart: (date: string) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (item) =>
        set((state) => ({ items: [...state.items, item] })),
      updateCartItem: (index, item) =>
        set((state) => {
          const newItems = [...state.items];
          newItems[index] = item;
          return { items: newItems };
        }),
      removeFromCart: (date) =>
        set((state) => ({
          items: state.items.filter((item) => item.date !== date),
        })),
      clearCart: () => set({ items: [] }),
      getCartCount: () => {
        const state = get();
        return state.items.length;
      },
      getSubtotal: () => {
        const state = get();
        return state.items.reduce(
          (sum, item) => sum + Number(item.totalPrice ?? 0),
          0,
        );
      },
    }),
    {
      name: "taleora_cart", // This matches the previous raw localStorage key
    },
  ),
);
