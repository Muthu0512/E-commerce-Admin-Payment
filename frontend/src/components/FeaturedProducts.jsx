import { useState, useEffect } from "react";
import { ShoppingCart, ChevronRight, ChevronLeft } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";
import { toast } from "react-hot-toast";

const FeaturedProducts = ({ featuredProducts }) => {
    const {addItemsToCart} = useCartStore()
  const [currentIndex, setCurrentIndex] = useState(0);
  const [noOfItems, setNoOfItems] = useState(4);

 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) setNoOfItems(1);
      else if (window.innerWidth < 1024) setNoOfItems(2);
      else if (window.innerWidth < 1280) setNoOfItems(3);
      else setNoOfItems(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + noOfItems);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - noOfItems);
  };

  const isStartDisabled = currentIndex === 0;
  const isEndDisabled = currentIndex >= featuredProducts.length - noOfItems;

  
  return (
    <div className="mt-5 flex px-auto py-4">
      <div className="w-full ">
        <h2 className="text-3xl text-emerald-600 font-semibold underline">
          {" "}
          Featured Products{" "}
        </h2>
      <div className="relative mt-10 max-w-screen px-10 ">
        <div className="  overflow-hidden flex  items-center justify-center px-12 py-6    rounded-md shadow-inner shadow-emerald-300 ">
          <div  className="flex gap-5  transition-transform duration-300 ease-in-out px-4" style={{transform:`translateX(-${currentIndex * (100/noOfItems)}%)`}}>
         
       
          {featuredProducts.map((product) => (
            <div
              className="bg-black/40 shadow-2xl space-y-3 w-5  md:w-20 flex flex-col items-center   md:px-10 rounded-md"
              key={product._id} style={{minWidth:`${80/noOfItems}%`}}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 mt-2   rounded-md object-cover"
                loading="lazy"
              />
              <h4 className="m-1 text-2xl text-emerald-500">
                {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
              </h4>
              <section className="flex justify-between items-center w-full m-4 ">
                <p className="flex-1 font-bold text-lg text-blue-400/70">
                  ₹ {product.price}
                </p>
                <button onClick={()=>addItemsToCart(product)}
                  className=" bg-emerald-600 rounded-full p-2 cursor-pointer shadow-md  shadow-emerald-400 active:scale-90
                transition-all duration-75"
                >
                  <ShoppingCart className="size-6" />
                </button>
              </section>
            </div>
          ))}
             </div>
                <button onClick={prevSlide} className={`absolute top-1/2 -translate-y-5 left-5 rounded-full transition-all duration-75 size-10 ${isStartDisabled ? "bg-gray-700 cursor-not-allowed " :" bg-emerald-600  hover:bg-emerald-400 cursor-pointer"} `} disabled={isStartDisabled }>
              <ChevronLeft  className="flex justify-center"/>
            </button>
            <button onClick={nextSlide} className={`absolute top-1/2 -translate-y-5 right-5 rounded-full transition-all duration-75 size-10 ${isEndDisabled ? "bg-gray-700 cursor-not-allowed " :" bg-emerald-600  hover:bg-emerald-400 cursor-pointer"} `} disabled={isEndDisabled }>
              <ChevronRight />
            </button>
           
        </div>

      </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
