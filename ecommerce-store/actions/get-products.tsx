import { Product } from "@/types";
import qs from "query-string";


interface Query {
  categoryId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}

const getProducts = async (storeId: string, query: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_URL}/${storeId}/products`,
    query: {
      sizeId: query.sizeId,
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
    },
  });
  const res = await fetch(url, { next: { revalidate: 0 } });
  return res.json();
};

export default getProducts;
