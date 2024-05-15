"use client";

import { Restaurant, UserFavoritesRestaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurants } from "../_actions/search";
import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";

interface RestaurantProps {
  userFavoriteRestaurants: UserFavoritesRestaurant[];
}

const Restaurants = ({ userFavoriteRestaurants }: RestaurantProps) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const searchParams = useSearchParams();

  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return;
      const foundRestaurants = await searchForRestaurants(searchFor);
      setRestaurants(foundRestaurants);
    };

    fetchRestaurants();
  }, [searchFor]);

  if (!searchFor) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Encontrados</h2>

        {restaurants.length == 0 ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <span className="text-muted-foreground">
              Restaurante(s) não encontrado(s)
            </span>

            <Button
              variant="ghost"
              className="p-0 text-primary hover:bg-transparent"
              asChild
            >
              <Link href="/">
                <ChevronLeftIcon size={16} />
                Voltar para o início
              </Link>
            </Button>
          </div>
        ) : (
          <div className="flex w-full flex-col gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={restaurant}
                className="min-w-full max-w-full"
                userFavoritesRestaurants={userFavoriteRestaurants}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Restaurants;
