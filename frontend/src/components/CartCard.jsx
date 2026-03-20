import { useEffect } from "react";
import { useCartStore } from "../stores/useCartStore";
import { Minus, Plus, Trash2 } from "lucide-react";

const CartCard = ({ product }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <div className=" overflow-hidden  ">
      <div className="bg-gray-900/60 rounded-xl border-2 border-gray-500 flex gap-5  justify-evenly items-center mb-4 px-auto py-2 ">
        <section className="px-auto py-2 flex flex-col items-center justify-center gap-2  ">
          <img
            src={product.image}
            alt={product.name}
            className="size-20 object-cover rounded-lg"
          />
          <h2 className=" text-emerald-500">{product.name.toUpperCase()}</h2>
        </section>
        <section className="flex flex-col justify-center items-center gap-2 font-bold">
          

          <h2>{product.description}</h2>
          <p className="text-gray-300 text-center mt-1">₹ {product.price}</p>
        </section>
        <section className="flex flex-col gap-4 items-center justify-center">
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
  );
};

export default CartCard;
