import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";
import Link from "next/link";
import Image from "next/image";

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      discountPercentage: "desc",
    },
  });

  return (
    <>
      <Header />

      <div className="px-5 pt-6 lg:flex lg:h-[32rem] lg:items-center lg:justify-evenly lg:overflow-y-hidden lg:bg-primary">
        <div className="flex lg:w-[40rem] lg:flex-col lg:gap-6">
          <div className="hidden lg:flex lg:flex-col">
            <h1 className="text-[3rem] font-bold text-white">Está com fome?</h1>
            <span className="block text-lg text-white">
              Com apenas alguns cliques, encontre refeições acessíveis perto de
              você.
            </span>
          </div>

          <div className="w-full lg:rounded-lg lg:bg-white lg:p-5">
            <Search />
          </div>
        </div>

        <div className="top-24 hidden lg:relative lg:flex lg:h-96 lg:w-96">
          <Image
            src="/food_hero_section.png"
            alt="Imagem de comida no Hero Section"
            fill
            className="rounded-full object-fill shadow-2xl"
          />
        </div>
      </div>

      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <PromoBanner
          src="/promo-banner-01.png"
          alt="Até 30% de Desconto em Pizzas"
        />
      </div>

      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/products/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>

        <ProductList products={products} />
      </div>

      <div className="px-5 pt-6">
        <PromoBanner
          src="/promo-banner-02.png"
          alt="A partir de R$17,90 em Lanches"
        />
      </div>

      <div className="space-y-4 py-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>
          <Button
            variant="ghost"
            className="p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/restaurants/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>

        <RestaurantList />
      </div>
    </>
  );
};

export default Home;
