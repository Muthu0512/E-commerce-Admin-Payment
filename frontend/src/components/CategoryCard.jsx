import { ShoppingCart } from "lucide-react";
import { toast } from "react-hot-toast";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const CategoryCard = ({ product }) => {
 
  const { addItemsToCart } = useCartStore();

  function handleClick() {
    addItemsToCart(product);

    toast.success("product added to the cart", { id: "0512" });
  }
  return (
    <div className=" flex flex-col mx-auto my-4  px-2  py-4 space-y-3 items-center line-clamp-2 justify-around relative w-60 h[450px] rounded-xl   text-gray-100 border-emerald-700 border-2 text-center ">
      <section className=" flex items-start justify-center  w-full h-full ">
        <img
          src={product.image}
          alt={product.name}
          className="size-32 object-cover rounded-full  shadow-emerald-600  shadow-md"
        />

        <div className="bg-black/20 z-20 w-full h-full rounded-md pointer-events-none  absolute top-0 left-0 "></div>
      </section>
      <h3 className="text-2xl font-bold">
        {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
      </h3>
      <p className="text-xl text-wrap">{product.description}</p>
      <p className="text-4xl text-left font-bold ">₹ {product.price}</p>
      <button
        onClick={handleClick}
        className="bg-emerald-600 px-4 py-2 rounded-md font-bold cursor-pointer  hover:bg-emerald-400 active:scale-75 transition-all duration-300"
      >
        Add to Cart{" "}
        <ShoppingCart className="inline-block size-6 font-bold" />{" "}
      </button>
    </div>
  );
};

export default CategoryCard;
