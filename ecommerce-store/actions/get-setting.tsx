import { Store } from "@/types";

const getSetting = async (storeId: string): Promise<Store> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stores/${storeId}`, {next: {revalidate: 0}});
  return res.json();
};

export default getSetting;