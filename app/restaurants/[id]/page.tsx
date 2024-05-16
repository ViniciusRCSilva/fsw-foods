import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/product-list";
import CartBanner from "./_components/cart-banner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import Header from "@/app/_components/header";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  const session = await getServerSession(authOptions);

  const userFavoriteRestaurants = await db.userFavoritesRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <>
      <div className="hidden lg:sticky lg:top-0 lg:z-50 lg:block lg:w-full">
        <Header searchSection />
      </div>

      <div className="lg:px-[15rem]">
        <div className="block lg:hidden">
          <RestaurantImage
            restaurant={restaurant}
            userFavoriteRestaurants={userFavoriteRestaurants}
          />
        </div>

        <div className="relative z-40 mt-[-1.5rem] rounded-t-3xl bg-white py-5 lg:m-0 lg:rounded-none">
          <div className="px-5 lg:p-0 lg:pt-10">
            <div className="flex justify-between">
              <div className="relative hidden h-[380px] w-[750px] lg:block">
                <Image
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>

              <div className="block w-full lg:flex lg:w-[500px] lg:flex-col lg:justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[0.375rem]">
                    <div className="relative h-8 w-8">
                      <Image
                        src={restaurant.imageUrl}
                        alt={restaurant.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <h1 className="text-xl font-semibold">{restaurant.name}</h1>
                  </div>

                  <div className="flex items-center gap-[2px] rounded-full bg-foreground px-2 py-[2px] text-white">
                    <StarIcon
                      size={12}
                      className="fill-yellow-500 text-yellow-500"
                    />
                    <span className="text-xs font-semibold">5.0</span>
                  </div>
                </div>

                <DeliveryInfo restaurant={restaurant} />

                <div className="mt-3 flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
                  {restaurant.categories.map((category) => (
                    <div
                      key={category.id}
                      className="min-w-[167px] rounded-lg bg-[#F4F4F4] text-center"
                    >
                      <span className="text-xs text-muted-foreground">
                        {category.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="hidden lg:flex lg:h-[183px] lg:w-full lg:flex-col">
                  <span className="font-semibold">Sobre</span>

                  <span className="text-justify text-sm text-muted-foreground">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Molestias voluptas quas minima aliquid corrupti id, aliquam
                    quidem similique sapiente ex natus rem aut unde assumenda
                    optio maiores placeat repudiandae vero!
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="font-semibold">Mais Pedidos</h2>
            </div>
          </div>

          <div className="mt-4">
            <ProductList products={restaurant.products} />
          </div>

          <div className="flex flex-col-reverse">
            {restaurant.categories.map((category) => (
              <div className="mt-4 space-y-4" key={category.id}>
                <h2 className="px-5 font-semibold">{category.name}</h2>
                <ProductList products={category.products} />
              </div>
            ))}
          </div>
        </div>

        <CartBanner restaurant={restaurant} />
      </div>
    </>
  );
};

export default RestaurantPage;
