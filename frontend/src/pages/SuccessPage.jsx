import { React, useEffect, useState } from "react";
import { ArrowRightSquare, CheckCircle, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import  axios  from "../lib/axiosInstance.js";
import Confetti from "react-confetti"

const SuccessPage = () => {
  const { total, clearCart } = useCartStore();

  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(()=>{

    const handlePaymentSuceess = async (sessionId) => {
      try {
        const res = await axios.post("/payments/checkout-success", { sessionId });
        console.log("res from backend for handle Payment success page",res.data)
        clearCart();
      } catch (error) {
        console.error("error from payment-success page", error.message);
        setIsProcessing(false);
      } finally {
        setIsProcessing(false);
      }
    };
  
    const sessionId = new URLSearchParams(window.location.search).get('session_id')
    console.log("sessionId is here" ,sessionId)
   if (sessionId){
    handlePaymentSuceess(sessionId)
   }
   else{
    setIsProcessing(true)
   }
  },[clearCart])

  // if (isProcessing) return "processing wait ....";


  
  return (
    <div className="max-h-screen w-full flex justify-center items-center   ">
      <Confetti
      width={window.innerWidth} height={window.innerHeight} gravity={0.5} style={{Zindex:50}} numberOfPieces={1000} recycle={false}/>
      <div className="  bg-gray-900/65 w-2xs mt-10  p-3 space-y-4 flex flex-col items-center justify-center rounded-md shadow-lg shadow-emerald-900">
        <CheckCircle className="size-12 text-emerald-500" />
        <h4 className=" text-emerald-500 text-lg">Purchase Successful </h4>
        <p className="text-sm ">
          We are working on your order, and it'll reach you shortly.
        </p>
        <div className="bg-gray-700 w-full px-2 py-3 space-y-2 rounded-md ">
          <section className="flex justify-between">
            <span>Order id</span>
            <span className="text-emerald-500">
              # id - {Math.ceil(Math.random() * 100000)}
            </span>
          </section>
          <section className="flex justify-between">
            <span>Total Amount</span>
            <span className="text-emerald-500">₹ {total}</span>
          </section>
        </div>
        <div className="flex justify-between items-center gap-2 bg-emerald-700 hover:bg-emerald-800 rounded-md px-2 py-1  cursor-wait">
          <p>Thank you for choosing Us....</p>
          <HeartHandshake className="size-5  text-red-800" />
        </div>
        <Link
          to={"/"}
          className="text-emerald-500 bg-black/90 hover:bg-gray-800 transtion-colors duration-200 rounded-md px-4 py-2 flex justify-between items-center gap-3"
        >
          <p>Continue shopping </p>
          <ArrowRightSquare className="size-6" />
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
