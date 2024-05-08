import Image from "next/image";
import { CartContext, CartProduct } from "../_context/cart";
import { calculateProductTotalPrice, formatCurrency } from "./_helpers/price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    increaseProductQuantity,
    decreaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseQuantityClick = () => {
    decreaseProductQuantity(cartProduct.id);
  };

  const handleIncreaseQuantityClick = () => {
    increaseProductQuantity(cartProduct.id);
  };

  const handleRemoveProductFromCart = () => {
    removeProductFromCart(cartProduct.id);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-xs">{cartProduct.name}</h3>
          <div className="flex items-center gap-1">
            <h3 className="text-sm font-semibold">
              {formatCurrency(
                calculateProductTotalPrice(cartProduct) * cartProduct.quantity,
              )}
            </h3>

            {cartProduct.discountPercentage > 0 && (
              <h4 className="text-xs text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </h4>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              className="h-8 w-8 border-[1px] bg-white text-foreground"
              variant="ghost"
              size="icon"
              onClick={handleDecreaseQuantityClick}
            >
              <ChevronLeftIcon size={18} />
            </Button>

            <span className="w-5 text-center text-sm">
              {cartProduct.quantity}
            </span>

            <Button
              className="h-8 w-8"
              size="icon"
              onClick={handleIncreaseQuantityClick}
            >
              <ChevronRightIcon size={18} />
            </Button>
          </div>
        </div>
      </div>

      <Button
        size="icon"
        className="h-8 w-8 border border-solid border-muted-foreground"
        variant="ghost"
        onClick={handleRemoveProductFromCart}
      >
        <TrashIcon size={18} />
      </Button>
    </div>
  );
};

export default CartItem;
