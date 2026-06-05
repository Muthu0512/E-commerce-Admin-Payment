import { useEffect } from "react";
import { useCartStore } from "../stores/useCartStore";
import { Minus, Plus, Trash2 } from "lucide-react";

const CartCard = ({ product }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <div className=" overflow-hidden  ">
      <div className="bg-gray-900/60 rounded-xl border-2 border-gray-500 flex gap-5  justify-evenly items-center mb-4 px-auto py-2 px-3">
        <section className="px-auto py-2 flex flex-col items-center justify-center  gap-2  ">
          <img
            src={product.image}
            alt={product.name}
            className="size-12 sm:size-20 object-cover rounded-lg"
          />
          <h2 className=" text-emerald-500">{product.name[0].toUpperCase() + product.name.slice(1) }</h2>
        </section>
        <section className="flex flex-col justify-center items-center gap-2 font-bold">
          

          <h2 className="text-sm md:text-lg">{product.description}</h2>
          <p className="text-gray-300 text-center mt-1 text-sm sm:text-lg">₹ {product.price}</p>
        </section>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-8 text-sm sm:text-md ">

        <section className="flex flex-col gap-2 items-center justify-center">
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => updateQuantity(product._id, product.quantity - 1)}
              className="cursor-pointer active:scale-10 transition-all duration-200 bg-black/70 p-0.2 rounded-sm "
            >
              <Minus />
            </button>
            {product.quantity}
            <button
              onClick={() => updateQuantity(product._id, product.quantity + 1)}
              className="cursor-pointer active:scale-10 active:opacity-0 transition-all duration-200 bg-black/60 p-0.2 rounded-sm"
            >
              <Plus />
            </button>
          </div>
          <div>
            <p className=" text-emerald-500 font-extrabold">
              ₹ {product.price * product.quantity}
            </p>
          </div>
        </section>
        <section>
          <button
            onClick={() => removeFromCart(product._id)}
            className="text-red-600 cursor-pointer  transition-all duration-200 hover:opacity-45 hover:scale-125"
          >
            <Trash2 />
          </button>
        </section>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
