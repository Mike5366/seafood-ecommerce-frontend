import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    storeId: string;
  };
}) {
  return (
    <>
      <Navbar storeId={params.storeId}/>
      {children}
      <Footer />
    </>
  );
}
