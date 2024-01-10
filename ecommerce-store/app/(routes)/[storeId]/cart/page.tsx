"use client";

import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import CartItem from "./components/cart-item";
import Summary from "./components/summary";

interface CartPageProps {
  params: {
    storeId: string;
  };
}

const CartPage: React.FC<CartPageProps> = ({ params }) => {
  const cart = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (useCart.persist.getOptions().name !== "cart-storage-" + params.storeId) {
      const storageName = useCart.persist.getOptions().name || "";
      localStorage.removeItem(storageName);

      useCart.persist.setOptions({
        name: "cart-storage-" + params.storeId,
      });

      useCart.persist.rehydrate();
    }
  }, [params.storeId]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {cart.orderItems.length === 0 && (
                <p className="text-neutral-500">No items added to cart</p>
              )}
              <ul>
                {cart.orderItems.map((orderItem) => (
                  <CartItem
                    key={orderItem.product.id}
                    storeId={params.storeId}
                    data={orderItem}
                  />
                ))}
              </ul>
            </div>
            <Summary storeId={params.storeId} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
