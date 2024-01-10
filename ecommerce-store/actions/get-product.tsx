import { Product } from "@/types";

const getProduct = async (storeId: string, id: string): Promise<Product> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${storeId}/products/${id}`, {next: {revalidate: 0}});
  return res.json();
};

export default getProduct;
