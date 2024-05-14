import { useContext, useState } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { createOrder } from "../_actions/order";
import { OrderStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import { CheckIcon, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface CartProps {
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (isOpen: boolean) => void;
}

const Cart = ({ setIsOpen }: CartProps) => {
  const [isSubmitLoading, setSubmitLoading] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isCreateOrderConfirmed, setIsCreateOrderConfirmed] = useState(false);

  const { data } = useSession();

  const { products, subtotalPrice, totalPrice, totalDiscounts, clearCart } =
    useContext(CartContext);

  const handleFinishOrderClick = async () => {
    if (!data?.user) return;

    const restaurant = products[0].restaurant;

    try {
      setSubmitLoading(true);

      await createOrder({
        subtotalPrice,
        totalDiscounts,
        totalPrice,
        deliveryFee: restaurant.deliveryFee,
        deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
        restaurant: {
          connect: { id: restaurant.id },
        },
        status: OrderStatus.CONFIRMED,
        user: {
          connect: { id: data.user.id },
        },
        products: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
      });
      clearCart();
      setIsCreateOrderConfirmed(true);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <>
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

            <Button
              className="mt-6 w-full"
              onClick={() => setIsConfirmDialogOpen(true)}
              disabled={isSubmitLoading}
            >
              Finalizar pedido
            </Button>
          </>
        )}
      </div>

      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja finalizar seu pedido?</AlertDialogTitle>
            <AlertDialogDescription>
              Ao finalizar o pedido, você concorda com os termos e condições da
              nossa plataforma.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitLoading}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleFinishOrderClick}
              disabled={isSubmitLoading}
            >
              {isSubmitLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Finalizar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={isCreateOrderConfirmed}
        onOpenChange={setIsCreateOrderConfirmed}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex w-full flex-col items-center gap-6">
              <CheckIcon className="h-16 w-16 rounded-full bg-primary p-4 text-white" />
              Pedido Efetuado!
            </AlertDialogTitle>
            <AlertDialogDescription>
              Seu pedido foi realizado com sucesso.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-0 bg-[#F4F4F5]">
              Confirmar
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Cart;
