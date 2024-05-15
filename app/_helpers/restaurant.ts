import { UserFavoritesRestaurant } from "@prisma/client";

export const isRestaurantFavorited = (
  restaurantId: string,
  userFavoriteRestaurants: UserFavoritesRestaurant[],
) => userFavoriteRestaurants?.some((fav) => fav.restaurantId === restaurantId);
