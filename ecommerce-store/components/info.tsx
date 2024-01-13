"use client";

import { Product } from "@/types";
import Currency from "@/components/ui/currency";
import Button from "./ui/button";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/use-cart";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";

interface InfoProps {
  storeId: string;
  data: Product;
  showDescription: boolean;
}

const Info: React.FC<InfoProps> = ({storeId, data, showDescription }) => {
  const cart = useCart();
  const [quantity, setQuantity] = useState(1);

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

  const onAddToCart = () => {
    cart.addItem(data, quantity);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>{data?.size?.name}</div>
        </div>
        {showDescription && (
          <div className="flex items-start gap-x-4">
            <h3 className="font-semibold text-black">Description:</h3>
            <div>{data?.description.split("\n").map((line) => { return <div key={line}> {line} <br/> </div>})}</div>
          </div>
        )}
        <div className="flex items-center gap-x-4">
          <div className="flex items-center gap-x-4">
            <h3 className="font-semibold text-black">Quantity:</h3>
            <Input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => {
                setQuantity(parseInt(e.target.value));
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button onClick={onAddToCart} className="flex items-center gap-x-2">
          Add To Cart
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Info;
