import { Billboard } from "@/types";

const getBillboard = async (storeId: string, id: string): Promise<Billboard> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${storeId}/billboards/${id}`, {next: {revalidate: 0}});
  return res.json();
};

export default getBillboard;
