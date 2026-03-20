
import { useState,useEffect} from "react";
import { PlusCircle, ShoppingBag, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import CreateProduct  from "../components/CreateProduct";
import Analytics from "../components/Analytics";
import ProductsList from "../components/ProductsList";
import {useProductStore} from "../stores/useProductStore"


const AdminPage = () => {
  const {fetchAllProducts} = useProductStore()

  useEffect(()=>{
    fetchAllProducts()
  },[fetchAllProducts])
  const tabs = [
    {
      id: "create",
      name: "Create Product",
      icon: PlusCircle,
    },
    {
      id: "productsList",
      name: "ProductsList",
      icon: ShoppingBag,
    },
    {
      id: "analytics",
      name: "Analytics",
      icon: BarChart,
    },
  ];
  const [activeTab, setActiveTab] = useState("create");

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-4xl text-center text-emerald-500 mx-auto my-5  "
      >
        {" "}
        Admin Dashboard
      </motion.h1>

      <div className="flex justify-center items-center gap-4 mx-auto my-6">
        {tabs.map((tab) => (
          <button key={tab.id}
            onClick={(e) => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2  rounded-md text-white cursor-pointer transition-colors duration-500 ${
              activeTab === tab.id
                ? "bg-emerald-500"
                : "bg-gray-900 hover:bg-gray-700"
            }`}
          >
            {tab.name}
            <tab.icon className="size-6"/>
          </button>
        ))}
      </div>
        <div  className="container max-w-screen flex justify-center items-center  mx-auto">
        {
          activeTab === "create"  && <CreateProduct/>
        }
        {
          activeTab=== "productsList"  &&<ProductsList/>
        }
        {
          activeTab=== "analytics"  &&<Analytics/>
        }
      </div>

     
    </div>
  );
};

export default AdminPage;
