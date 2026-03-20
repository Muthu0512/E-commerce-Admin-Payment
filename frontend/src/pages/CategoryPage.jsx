import React, { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import CategoryCard from "../components/CategoryCard";
import { DeleteIcon} from "lucide-react"
const CategoryPage = () => {
  const { getProductsByCategory, products } = useProductStore();
  const { category } = useParams();
  useEffect(() => {
    getProductsByCategory(category);
  }, [getProductsByCategory, category]);

  console.log("products by category ", products);
  return (
    <div className="flex items-center justify-center">
    <div className="min-h-screen w-full overflow-x-hidden space-y-4">
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-4xl text-emerald-500 text-center mx-auto my-10"
      >
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </motion.h2>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 3, delay: 0.5 }}
      className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 justify-center "
      >
        {products?.length ===0 &&( <h2 className="text-center text-5xl col-span-full">
          Sorry , currently no Products Available in this Category</h2> )}
        {products?.map((product) => (
          
            <CategoryCard key={product._id} product={product} />
        
        ))}
      </motion.div>
    </div>
    </div>
  );
};

export default CategoryPage;
