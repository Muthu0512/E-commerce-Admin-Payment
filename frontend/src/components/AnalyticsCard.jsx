import React from "react";
import { motion } from "framer-motion";


const AnalyticsCard = ({ title, value, icon: Icon }) => {
  return (
    <motion.div
      className={`overflow-hidden rounded-md  shadow-xl  relative  px-2 py-1 flex items-center justify-between text-center hover:bg-black/90 cursor-pointer `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2.5 }}
    >
      <div className="bg-linear-to-br bg-emerald-600 to-teal-800 opacity-30 absolute inset-0 " />
      <div className="z-10 flex flex-col justify-between items-center tracking-wider  ">
        <h2
         className="text-emerald-500 font-extrabold text-wrap  ">{title}</h2>
        <p className="font-bold ">{value}</p>
      </div>

      <Icon className=" right-4 top-4 opacity-10 size-10 overflow-hidden" />
    </motion.div>

  
  );
};

export default AnalyticsCard;
