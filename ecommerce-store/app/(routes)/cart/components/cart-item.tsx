"use client";

import Image from "next/image";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { OrderItem } from "@/types";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";

interface CartItemProps {
  data: OrderItem;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();
  const [quantity, setQuantity] = useState(data.quantity);

  const onSetQuantity = (e: ChangeEvent<HTMLInputElement>, data: OrderItem) => {
    e.stopPropagation();
    setQuantity(parseInt(e.target.value));
    cart.setItemQuantity(data.product, parseInt(e.target.value));
  };

  const onRemove = () => {
    cart.removeItem(data.product.id);
  };

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.product.images[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-black">{data.product.name}</p>
          </div>
          <div className="mt-1 flex text-sm">
            <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4">
              {data.product.size.name}
            </p>
          </div>
          <Currency value={data.product.price} />
        </div>
        <div className="flex items-center gap-x-4">
            <h3 className="font-semibold text-black">Quantity:</h3>
            <Input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => {onSetQuantity(e, data)}}
            />
          </div>
      </div>
    </li>
  );
};

export default CartItem;
