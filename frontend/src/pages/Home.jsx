import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts"




const categories = [{
  href:"/jeans" ,name:"Jeans" , imageUrl :"/jeans.jpg"},{href:"/suits",name:"Suits", imageUrl:"/suits.jpg"},
{ href:"/shoes" ,name:"Shoes",imageUrl:"/shoes.jpg"},{href:"/bags", name:"Bags",imageUrl:"/bags.jpg"},
{href:"/jackets", name:"Jackets" , imageUrl:"/jackets.jpg"}, {href:"/glasses", name:"Glasses",imageUrl:"/glasses.jpg"}, {href:"/watches" , name:"Watches", imageUrl:"/watches.jpg"},{href:"/t-shirts" , name:"Tshirts", imageUrl:"/tshirts.jpg"}]




const HomePage = () => {
  
  const {fetchFeaturedProducts,products,loading} =useProductStore()

  useEffect(()=>{
    fetchFeaturedProducts()
  },[fetchFeaturedProducts])
  return (
    <div className="w-full min-h-screen overflow-hidden text-center">
      <div className="max-w-7xl p-2 mt-4">
        <h2 className="text-emerald-400 text-center text-5xl font-medium">Explore Our Categories</h2>
        <p className="text-lg text-center my-4">Find out our latest collections and trend</p>
      </div>
      <div className="container max-w-5xl grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-5 mx-auto px-12">
          {
            categories.map(category=>(
              <CategoryItem category={category} key= {category.name}/>
            ))
          }
      </div>
          <div className="flex items-center justify-center ">
             {!loading && products.length> 0 && <FeaturedProducts featuredProducts ={products}/>}
            
          </div>
    </div>
  );
};

export default HomePage;
