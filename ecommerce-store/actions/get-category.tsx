import { Category } from "@/types";


const getCategory = async (storeId: string, id: string): Promise<Category> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${storeId}/categories/${id}`, {next: {revalidate: 0}});
  return res.json();
};

export default getCategory;
