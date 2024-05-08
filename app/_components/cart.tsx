import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "./_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Cart = () => {
  const { products, subtotalPrice, totalPrice, totalDiscounts } =
    useContext(CartContext);

  return (
    <div className="flex h-full flex-col py-5">
      <div className="flex-auto space-y-4 overflow-y-scroll [&::-webkit-scrollbar]:hidden">
        {products.length == 0 ? (
          <div className="flex justify-center">
            <span className="text-muted-foregroun text-sm">
              Sem itens na sacola
            </span>
          </div>
        ) : (
          <>
            {products.map((product) => (
              <CartItem cartProduct={product} key={product.id} />
            ))}
          </>
        )}
      </div>

      {products.length == 0 ? (
        <></>
      ) : (
        <>
          <Card>
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(subtotalPrice)}</span>
              </div>

              {products.length == 0 ? (
                <></>
              ) : (
                <>
                  <Separator />

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Entrega</span>
                    {Number(products[0].restaurant.deliveryFee) === 0 ? (
                      <span className="uppercase text-primary">Grátis</span>
                    ) : (
                      <span>
                        {formatCurrency(
                          Number(products[0].restaurant.deliveryFee),
                        )}
                      </span>
                    )}
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Descontos</span>
                    {products[0].discountPercentage === 0 ? (
                      <span>-</span>
                    ) : (
                      <span>-{formatCurrency(totalDiscounts)}</span>
                    )}
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Button className="mt-6 w-full">Finalizar pedido</Button>
        </>
      )}
    </div>
  );
};

export default Cart;
