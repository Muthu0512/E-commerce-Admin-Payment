import { useEffect } from "react";
import { useCartStore } from "../stores/useCartStore";
import CartCard from "../components/CartCard";
import OrderSummary from "../components/OrderSummary";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import { ArrowRight, ShoppingCartIcon, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, getCartItems } = useCartStore();

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);
  console.log("mongoDBcart", cart);
  return (
    <div className="min-h-screen  py-4  max-w-full ">
      {cart.length == 0 ? (
        <div className="flex flex-col gap-5 items-center justify-center pt-10">
          <ShoppingCartIcon className="size-32 " />
          <p className="text-xl">
            It's seems there is nothing in your cart , please add some products
            ....
          </p>
          <Link
            to={"/"}
            className="bg-emerald-800 px-2 py-1 rounded-md  hover:bg-emerald-700  active:scale-90"
          >
            {" "}
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4 px-5 justify-around  overflow-hidden ">
          <div className="h-fit w-full   bg-emerald-900 text-white/95 col-span-12 p-1 rounded-sm">
            <div className=" text-center  ">
              <p className="overflow-hidden animate-pulse text-black font-extrabold text-md">
                If your purchase worth more than 2000 , you got a discount
                coupon (worth 5 % to 50 %) on your next purchase{" "}
              </p>
            </div>
          </div>

          <div className="m-4 col-span-12  md:col-span-8">
            {cart.map((product, index) => (
              <CartCard key={index} product={product} />
            ))}

            {cart.length > 0 && <PeopleAlsoBought />}
          </div>
          <div className="col-span-4 md:col-span-3">
            <OrderSummary />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
