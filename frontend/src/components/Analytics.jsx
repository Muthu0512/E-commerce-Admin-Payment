import AnalyticsCard from "./AnalyticsCard.jsx";
import { useState, useEffect } from "react";
import axios from "../lib/axiosInstance.js";
import {motion} from "framer-motion"
import {
  Users,
  Package,
  IndianRupee,
  LucideShoppingBasket,
  Loader
  
} from "lucide-react";
import {ResponsiveContainer,LineChart, CartesianGrid,XAxis,YAxis,Tooltip,Legend,Line} from "recharts"

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    revenue: 0,
    totalRevenue: 0,
  });
  const [dailySalesData, setDailySalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAnalyticsData = async () => {
      try {
        const response = await axios.get("/analytics");
        setAnalyticsData(response.data.analyticsData);
        setDailySalesData(response.data.dailySalesData);
        setIsLoading(false);
            } catch (error) {
        setIsLoading(false);
       
      } finally {
        setIsLoading(false);
      }
    };

    getAnalyticsData();
  }, []);

  if (isLoading) {
    return <Loader className="h-screen flex justify-center items-center size-28  " />;
  }

  return (
    <motion.div initial={{opacity:0,x:100}} animate={{opacity:1,x:0}} transition={{duration:1.5}}
     className="min-h-screen max-w-full  ">
      <div className="w-full  p-8 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          <AnalyticsCard
            title="Total Products"
            value={analyticsData.products.toLocaleString()}
            icon={Package}
          />
          <AnalyticsCard
            title="Sales"
            value={analyticsData.sales.toLocaleString()}
            icon={LucideShoppingBasket}
          />
          <AnalyticsCard
            title="Total Users"
            value={analyticsData.users.toLocaleString()}
            icon={Users}
          />
          <AnalyticsCard 
            title="Revenue"
            value={`₹ ${analyticsData.revenue.toLocaleString()}`}
            icon={IndianRupee}
          />
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={500} className="overflow-x-scroll sm:overflow-hidden  "> 
        <LineChart data={dailySalesData}>
            <CartesianGrid  strokeDasharray={"10 10"}  ></CartesianGrid>
            <XAxis dataKey={"date"}  stroke={"Green"}/>
            <YAxis yAxisId="left"   stroke="#f43f5e" width={50}  domain={[0 , "auto"]}/>
            <YAxis yAxisId="right" orientation="right" stroke="orange" domain={[ 0 ,"auto"]}/>
            <Tooltip cursor="none"/>
            <Legend/>
            
            <Line yAxisId={"left"} type={"monotone"} dataKey={"sales"} name="Sales" activeDot={{r:5}} stroke="#f43f5e"/>
            <Line yAxisId={"right"} type={"monotone"} dataKey={"revenue"} name="Revenue" activeDot={{r:5}} stroke= "orange"/>
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default Analytics;
