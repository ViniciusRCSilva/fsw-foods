"use client";

import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { formatCurrency } from "@/app/_helpers/price";
import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const getOrderStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case "CANCELED":
      return ["Cancelado", "bg-primary/80"];
    case "CONFIRMED":
      return ["Confirmado", "bg-green-500"];
    case "PREPARING":
      return ["Preparando", "bg-yellow-500"];
    case "DELIVERING":
      return ["Em transporte", "bg-yellow-500/60"];
    case "COMPLETED":
      return ["Finalizado", "bg-[#EEEEEE]"];
  }
};

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="space-y-3">
          <div
            className={`w-fit rounded-full ${getOrderStatusLabel(order.status)[1]} ${getOrderStatusLabel(order.status)[0] == "Finalizado" ? "text-muted-foreground" : "text-white"} px-2 py-1`}
          >
            <span className="block text-xs font-semibold">
              {getOrderStatusLabel(order.status)[0]}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={order.restaurant.imageUrl} />
              </Avatar>
              <span className="text-sm font-semibold">
                {order.restaurant.name}
              </span>
            </div>

            <Button variant="ghost" size="icon" className="h-5 w-5" asChild>
              <Link href={`/restaurants/${order.restaurant.id}`}>
                <ChevronRightIcon />
              </Link>
            </Button>
          </div>
        </div>

        <div className="py-3">
          <Separator />
        </div>

        <div className="space-y-1">
          {order.products.map((product) => (
            <div key={product.id} className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground">
                <span className="block text-xs text-white">
                  {product.quantity}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {product.product.name}
              </span>
            </div>
          ))}
        </div>

        <div className="py-3">
          <Separator />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm">{formatCurrency(Number(order.totalPrice))}</p>
          <Button
            variant="ghost"
            size="sm"
            className="text-sm text-primary hover:bg-primary hover:text-white"
            disabled={order.status !== "COMPLETED"}
          >
            Adicionar à sacola
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
