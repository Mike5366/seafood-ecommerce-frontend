import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import getSetting from "@/actions/get-setting";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

interface HomePageProps {
  params: {
    storeId: string;
  };
}

const HomePage: React.FC<HomePageProps> = async ({
  params,
}) => {
  const products = await getProducts(params.storeId, { isFeatured: true });
  const setting = await getSetting(params.storeId);
  const billboard = await getBillboard(params.storeId, setting.billboardId);

  return (
    <div>
      <Container>
        <div className="space-y-10 pb-10">
          {billboard && <Billboard data={billboard} />}
          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            {products.length !== 0 && <ProductList title="Featured Products" storeId={params.storeId} items={products} />}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
