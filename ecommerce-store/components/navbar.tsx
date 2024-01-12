import Link from "next/link";
import Container from "@/components/ui/container";
import MainNav from "@/components/main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "@/components/navbar-actions";
import getSetting from "@/actions/get-setting";

interface NavbarProps {
    storeId: string;
}

const Navbar: React.FC<NavbarProps> = async ({ storeId }) => {
  const categories = await getCategories(storeId);
  const setting = await getSetting(storeId);
  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href={`/${storeId}`} className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">{setting.name}</p>
          </Link>
          <MainNav storeId={storeId} data={categories} />
          <NavbarActions storeId={storeId}/>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
