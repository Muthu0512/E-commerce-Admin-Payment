import { useState, useEffect } from "react";
import axios from "../lib/axiosInstance";
import RecommendedCard from "./RecommendedCard";

import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";

const PeopleAlsoBought = () => {
  const [recommended, setRecommended] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommentations = async () => {
      try {
        const res = await axios.get("products/recommended");
        console.log("recommented response", res);
        setRecommended(res.data);
      } catch (error) {
        toast.error(error.response || "error occured in fetching products");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecommentations();
  }, []);

  if (isLoading)
    return (
      <Loader className="h-screen size-20 flex items-end justify-center text-blue-700" />
    );

  return (
    <div className="mt-10 ">
      <h2 className="text-2xl text-center text-emerald-500 underline underline-offset-8">
        People Also Bought
      </h2>

      <div className="mt-10 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 ">
        {recommended.map((product) => (
          <RecommendedCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PeopleAlsoBought;
