import { notFound } from "next/navigation";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant-item";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";

const userFavoriteRestaurants = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const userFavoriteRestaurants = await db.userFavoritesRestaurant.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <>
      <Header searchSection />
      <div className="px-5 py-6 lg:px-[15rem] lg:pt-10">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Favoritos</h2>
        <div className="flex w-full flex-col gap-6 lg:grid lg:grid-cols-3">
          {userFavoriteRestaurants.length > 0 ? (
            userFavoriteRestaurants.map(({ restaurant }) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={restaurant}
                className="min-w-full max-w-full"
                userId={session?.user.id}
                userFavoritesRestaurants={userFavoriteRestaurants}
              />
            ))
          ) : (
            <span className="text-sm text-muted-foreground">
              Você ainda não marcou nenhum restaurante como favorito.
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default userFavoriteRestaurants;
