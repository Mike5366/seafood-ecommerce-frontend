import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { OrderItem, Product } from "@/types";
import toast from "react-hot-toast";

interface CartStore {
  orderItems: OrderItem[];
  addItem: (data: Product, quantity: number) => void;
  setItemQuantity: (data: Product, quantity: number) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      orderItems: [],
      addItem: (data: Product, quantity: number) => {
        const currentItems = get().orderItems;
        const exitstItem = currentItems.find(
          (orderItem) => orderItem.product.id === data.id
        );

        if (exitstItem) {
          const updatedItems = currentItems.map((orderItem) => {
            if (orderItem.product.id === data.id) {
              return { ...orderItem, quantity: orderItem.quantity + quantity };
            }

            return orderItem;
          });

          set({ orderItems: updatedItems });
        } else {
          set({
            orderItems: [
              ...get().orderItems,
              { product: data, quantity: quantity },
            ],
          });
        }

        toast.success("Item added to cart.");
      },
      setItemQuantity: (data: Product, quantity: number) => {
        const currentItems = get().orderItems;
        const exitstItem = currentItems.find(
          (orderItem) => orderItem.product.id === data.id
        );

        if (exitstItem) {
          const updatedItems = currentItems.map((orderItem) => {
            if (orderItem.product.id === data.id) {
              return { ...orderItem, quantity: quantity };
            }

            return orderItem;
          });

          set({ orderItems: updatedItems });
        }
      },
      removeItem: (id: string) => {
        set({
          orderItems: [
            ...get().orderItems.filter(
              (orderItems) => orderItems.product.id !== id
            ),
          ],
        });
        toast.success("Item removed from the cart.");
      },
      removeAll: () => set({ orderItems: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
