const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";

const Home = async () => {
  await delay(2000);
  const latestProducts = await getLatestProducts();

  return (
    <>
      <ProductList data={latestProducts} title={"Produse Noi"} />
    </>
  );
};

export default Home;
