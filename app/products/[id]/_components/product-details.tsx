"use client";

import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_components/_helpers/price";
import DiscountBadge from "@/app/_components/discount-badge";
import ProductList from "@/app/_components/product-list";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { Prisma } from "@prisma/client";
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TimerIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantityClick = () =>
    setQuantity((currentState) => currentState + 1);

  const handleDecreaseQuantityClick = () =>
    setQuantity((currentState) => {
      if (currentState === 1) {
        return 1;
      }

      return currentState - 1;
    });

  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl bg-white py-5">
      <div className="px-5">
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative h-6 w-6">
            <Image
              src={product.restaurant.imageUrl}
              alt={product.restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>

        <h1 className="mb-3 mt-1 text-xl font-semibold">{product.name}</h1>

        <div className="flex justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">
                {formatCurrency(calculateProductTotalPrice(product))}
              </h2>

              {product.discountPercentage > 0 && (
                <DiscountBadge product={product} />
              )}
            </div>

            {product.discountPercentage > 0 && (
              <span className="block text-sm text-muted-foreground">
                De: {formatCurrency(Number(product.price))}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              className="border-[1px] bg-white text-foreground"
              size="icon"
              variant="ghost"
              onClick={handleDecreaseQuantityClick}
            >
              <ChevronLeftIcon />
            </Button>

            <span className="w-4 text-center">{quantity}</span>

            <Button size="icon" onClick={handleIncreaseQuantityClick}>
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        <Card className="mt-6 flex justify-around py-3">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>Entrega</span>
              <BikeIcon size={14} />
            </div>

            {Number(product.restaurant.deliveryFee) > 0 ? (
              <p className="text-xs font-semibold">
                {formatCurrency(Number(product.restaurant.deliveryFee))}
              </p>
            ) : (
              <p className="text-xs font-semibold">Grátis</p>
            )}
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>Entrega</span>
              <TimerIcon size={14} />
            </div>

            <p className="text-xs font-semibold">
              {product.restaurant.deliveryTimeMinutes} min
            </p>
          </div>
        </Card>

        <div className="mt-6 space-y-3">
          <h3 className="font-semibold">Sobre</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold">Peça também</h3>
        </div>
      </div>
      <ProductList products={complementaryProducts} />

      <div className="px-5 pt-5">
        <Button className="w-full px-4 py-3 text-sm font-semibold">
          Adicionar à Sacola
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;
