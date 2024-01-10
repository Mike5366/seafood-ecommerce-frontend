import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ModaleProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";

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
      <ModaleProvider storeId={params.storeId}/>
      <ToastProvider />
      <Navbar storeId={params.storeId} />
      {children}
      <Footer />
    </>
  );
}
