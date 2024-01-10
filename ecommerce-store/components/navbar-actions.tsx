"use client";

import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface NavbarProps {
  storeId: string;
}

const NavbarActions: React.FC<NavbarProps> = ({ storeId }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cart = useCart();
  const router = useRouter();

  useEffect(() => {
    if (useCart.persist.getOptions().name !== "cart-storage-" + storeId) {
      const storageName = useCart.persist.getOptions().name || "";
      localStorage.removeItem(storageName);

      useCart.persist.setOptions({
        name: "cart-storage-" + storeId,
      });

      useCart.persist.rehydrate();
    }
  }, [storeId]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button
        onClick={() => router.push(`/${storeId}/cart`)}
        className="flex items-center rounded-full bg-black px-4 py-2"
      >
        <ShoppingBag size={20} color="white" />
        <span className="ml-2 text-sm font-medium text-white">
          {cart.orderItems.length}
        </span>
      </Button>
    </div>
  );
};

export default NavbarActions;
