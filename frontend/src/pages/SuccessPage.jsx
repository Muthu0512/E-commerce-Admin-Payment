import { React, useEffect, useState, useRef } from "react";
import { ArrowRightSquare, CheckCircle, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axiosInstance.js";
import Confetti from "react-confetti";
import {toast} from "react-hot-toast"
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const { total, clearCart } = useCartStore();
const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(true);
  const called = useRef(false);
  const [orderId, setOrderId] = useState("");
  const [finalAmount, setFinalAmount] = useState("");

  useEffect(() => {
    const handlePaymentSuccess = async (sessionId) => {
      try {
        const res = await axios.post("/payments/checkout-success", {
          sessionId,
        });
        setOrderId(res.data.orderId);
        setFinalAmount(res.data.finalAmount);
        clearCart();
        setIsProcessing(false)
      } catch (error) {
        toast.error( error?.response?.data?.message || "Error in handlePaymentSuccess ")
        navigate("/cart")
      } finally {
        setIsProcessing(false);
      }
    };

    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id",
    );
    
    if (!called.current) {
      called.current = true;
      handlePaymentSuccess(sessionId);
    }
  }, [navigate,clearCart]);

  
  if (isProcessing)
    return (
      <div className="flex items-center justify-center w-full h-screen text-emerald-400 text-2xl">
        Processing Please wait...
      </div>
    );

  return (
    <div className="min-h-screen w-full flex justify-center items-center   ">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.5}
        style={{ zIndex: 50 }}
        numberOfPieces={1000}
        recycle={false}
      />
      <div className="  bg-gray-900/65 w-fit mt-10 mx-10 px-2 py-3 space-y-6 flex flex-col items-center justify-center rounded-md shadow-lg shadow-emerald-900 text-center">
        <CheckCircle className="size-12 text-emerald-500" />
        <h4 className=" text-emerald-500 text-lg">Purchase Successful </h4>
        <p className="text-sm  ">
          We are working on your order, and it'll reach you shortly.
        </p>
        <div className="bg-gray-700 flex flex-col justify-between text-sm sm:text-lg  px-2 py-3 space-y-3 rounded-md ">
          <section className="flex justify-between items-center gap-3">
            <span>Order id </span>
            <span className="text-emerald-500 ">#{orderId}</span>
            {/* <span className="text-emerald-500 ">#{Math.ceil(Math.random()*100)}</span> */}
          </section>
          <section className="flex justify-between">
            <span>Total Amount </span>
            <span className="text-emerald-500">₹{finalAmount} </span>
            {/* <span className="text-emerald-500">₹{Math.ceil(Math.random()*100)} </span>   */}
          </section>
        </div>
        <div className="flex justify-between items-center gap-2 bg-emerald-700 hover:bg-emerald-800 rounded-md px-2 py-1  cursor-wait">
          <p>Thank you for choosing Us....</p>
          <HeartHandshake className="size-5  text-red-800" />
        </div>
        <Link
          to={"/"}
          className="text-emerald-500 bg-black/90 hover:bg-gray-800 transition-colors duration-200 rounded-md px-4 py-2 flex justify-between items-center gap-3 mb-2"
        >
          <p>Continue shopping </p>
          <ArrowRightSquare className="size-6" />
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
