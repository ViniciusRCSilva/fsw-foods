import { toast } from "../_components/ui/use-toast";
import { toggleFavoriteRestaurant } from "../_actions/restaurant";
import { UserFavoritesRestaurant } from "@prisma/client";
import { useRouter } from "next/navigation";

interface UseToggleFavoriteRestaurantProps {
  userId?: string;
  userFavoriteRestaurants?: UserFavoritesRestaurant[];
  restaurantId: string;
  restaurantIsFavorited?: boolean;
}

const useToggleFavoriteRestaurant = ({
  userId,
  restaurantId,
  restaurantIsFavorited,
}: UseToggleFavoriteRestaurantProps) => {
  const router = useRouter();

  const handleFavoriteClick = async () => {
    if (!userId) return;

    try {
      await toggleFavoriteRestaurant(userId, restaurantId);

      toast(
        restaurantIsFavorited
          ? {
              title: "Restaurante foi removido da sua lista de favoritos!",
              variant: "default",
            }
          : {
              title: "Restaurante foi adicionado na sua lista de favoritos!",
              variant: "default",
            },
      );
    } catch (error) {
      toast({
        title: "Erro ao favoritar restaurante.",
        variant: "destructive",
      });
    }
  };

  return { handleFavoriteClick };
};

export default useToggleFavoriteRestaurant;
