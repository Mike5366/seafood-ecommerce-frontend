import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";


const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard("1dbdedf9-e5f2-4a68-b010-80e1d8cbccd4");

  return (
    <div>
      <Container>
        <div className="space-y-10 pb-10">
          {billboard && <Billboard data={billboard} />}
          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            {products.length !== 0 && <ProductList title="Featured Products" items={products} />}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
