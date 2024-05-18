import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
import ProductDetails from "./_components/product-details";
import Header from "@/app/_components/header";
import Image from "next/image";
import ProductList from "@/app/_components/product-list";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  const complementaryProducts = await db.product.findMany({
    where: {
      restaurant: {
        id: product?.restaurant.id,
      },
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <>
      <Header searchSection />
      <div className="lg:px-[15rem]">
        <div className="block lg:hidden">
          <ProductImage product={product} />
        </div>

        <div className="flex justify-between lg:pt-10">
          <div className="relative hidden h-[31rem] w-[38rem] lg:block">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="rounded-lg object-cover shadow-lg"
              quality={100}
            />
          </div>

          <div className="w-full lg:h-[31rem] lg:w-[34rem] lg:border">
            <ProductDetails
              product={product}
              complementaryProducts={complementaryProducts}
            />
          </div>
        </div>

        <div className="mt-10 hidden space-y-2 lg:block">
          <h3 className="font-semibold">Peça também</h3>
          <ProductList products={complementaryProducts} />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
