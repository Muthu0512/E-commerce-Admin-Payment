import React from "react";
import {ShoppingCart} from "lucide-react"
import { useCartStore } from "../stores/useCartStore";
import {toast} from "react-hot-toast"

const RecommendedCard = ({ product }) => {
    const {addItemsToCart} = useCartStore()

   async function handleClick (){
    await addItemsToCart(product)
    toast.success("product added to the cart", { id: "0512" });
    }
  return (
    <div className="bg-emerald-900/30 max-w-64 max-h-40 border rounded-md shadow-lg shadow-black ">
      <div className="px-2 py-4 flex justify-center item-center gap-4 ">
        <img
          src={product.image}
          alt={product.name}
          className="size-20 rounded-full object-cover  "
          loading="lazy"
        />
        <div className="flex flex-col justify-center items-center gap-2 grow">
          <h2>{product.name.charAt(0).toUpperCase()+ product.name.slice(1)}</h2>
          <h4>₹ {product.price}</h4>
          <button
            onClick={handleClick}  className="bg-emerald-600 px-2 py-1 text-xs rounded-md font-bold cursor-pointer  hover:bg-emerald-400 active:scale-75 transition-all duration-300" >
            Add to Cart{" "}
            <ShoppingCart className="inline-block size-4 font-bold" />{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendedCard;
