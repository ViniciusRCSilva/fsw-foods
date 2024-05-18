import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";

const RecommendedProducts = async () => {
  const products = await db.product.findMany({
    include: {
      restaurant: true,
    },
    orderBy: {
      discountPercentage: "desc",
    },
  });

  return (
    <>
      <Header searchSection />
      <div className="px-5 py-6 lg:px-[15rem] lg:pt-10">
        <h2 className="mb-6 text-lg font-semibold">Pedidos Recomendados</h2>

        <div className="grid grid-cols-2 gap-6 lg:grid lg:grid-cols-6">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedProducts;
