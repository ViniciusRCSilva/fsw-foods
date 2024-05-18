import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import RestaurantItem from "@/app/_components/restaurant-item";
import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

interface CategoriesPageProps {
  params: {
    id: string;
  };
}

const CategoriesPage = async ({ params: { id } }: CategoriesPageProps) => {
  const session = await getServerSession(authOptions);

  const category = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      products: {
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
      restaurants: true,
    },
  });

  const userFavorites = await db.userFavoritesRestaurant.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  if (!category) {
    return notFound();
  }

  return (
    <>
      <Header searchSection />
      <div className="px-5 py-6 lg:px-[15rem] lg:pt-10">
        <h2 className="mb-6 flex gap-1 text-lg font-semibold">
          <span className="hidden lg:block">Comida</span>
          {category.name}
        </h2>

        <div className="grid grid-cols-2 gap-6 lg:grid lg:grid-cols-6">
          {category.products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              className="min-w-full max-w-full"
            />
          ))}
        </div>

        <div className="hidden pt-10 lg:block">
          <h2 className="mb-6 text-lg font-semibold">Restaurantes</h2>
          <div className="flex justify-between gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
            {category.restaurants.map((restaurant) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={restaurant}
                userId={session?.user.id}
                userFavoritesRestaurants={userFavorites}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
