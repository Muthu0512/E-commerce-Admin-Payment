import { React, useEffect, useState, useRef } from "react";
import { ArrowRightSquare, CheckCircle, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axiosInstance.js";
import Confetti from "react-confetti";

const SuccessPage = () => {
  const { total, clearCart } = useCartStore();

  const [isProcessing, setIsProcessing] = useState(true);
  const [finalAmount, setFinalAmount] = useState(0);
  const [orderId,setOrderId] = useState("")

  const hasCalledSuccessEndpoint = useRef(false);
  useEffect(() => {
    const handlePaymentSuceess = async (sessionId) => {
      try {
        const res = await axios.post("/payments/checkout-success", {
          sessionId,});
        console.log("res from backend for handle Payment success page",res.data);
        if (res?.data ) {
          if(res.data.finalAmount){

            setFinalAmount(res.data.finalAmount);
          }
          if(res.data.orderId){
            setOrderId(res.data.orderId)
          }
        }
        clearCart();
      } catch (error) {
        console.log("error from payment-success page", error.message);
        
      } finally {
        setIsProcessing(false);
      }
    };

    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id",
    );
    console.log("sessionId is here", sessionId);
    if (sessionId) {
      if (!hasCalledSuccessEndpoint.current) {
        hasCalledSuccessEndpoint.current = true;
        handlePaymentSuceess(sessionId);
      }
    } else {
      setIsProcessing(false);
    }
  }, [clearCart]);

  if (isProcessing) return "processing wait ....";

  return (
    <div className="max-h-screen w-full flex justify-center items-center   ">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.5}
        style={{ zIndex: 50 }}
        numberOfPieces={1000}
        recycle={false}
      />
      <div className="  bg-gray-900/65 w-fit mt-10 mx-10 p-3 space-y-6 flex flex-col items-center justify-center rounded-md shadow-lg shadow-emerald-900">
        <CheckCircle className="size-12 text-emerald-500" />
        <h4 className=" text-emerald-500 text-lg">Purchase Successful </h4>
        <p className="text-sm ">
          We are working on your order, and it'll reach you shortly.
        </p>
        <div className="bg-gray-700 flex flex-col justify-between text-sm sm:text-lg  px-2 py-3 space-y-3 rounded-md ">
          <section className="flex justify-between items-center gap-3">
            <span>Order id </span>
            <span className="text-emerald-500 ">
                     #{orderId} 
            </span>
          </section>
          <section className="flex justify-between">
            <span>Total Amount </span>
            <span className="text-emerald-500">₹ {finalAmount}</span>
          </section>
        </div>
        <div className="flex justify-between items-center gap-2 bg-emerald-700 hover:bg-emerald-800 rounded-md px-2 py-1  cursor-wait">
          <p>Thank you for choosing Us....</p>
          <HeartHandshake className="size-5  text-red-800" />
        </div>
        <Link
          to={"/"}
          className="text-emerald-500 bg-black/90 hover:bg-gray-800 transition-colors duration-200 rounded-md px-4 py-2 flex justify-between items-center gap-3"
        >
          <p>Continue shopping </p>
          <ArrowRightSquare className="size-6" />
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
