
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {loadStripe} from "@stripe/stripe-js"
import axios from "../lib/axiosInstance";
import GiftVoucher from "./GiftVoucher"


const stripe = loadStripe("pk_test_51SiBTlR2sBaer9223Ws82zMkVlGcPgNpz0nPfDwVVCwpyBHNvettTsgja390TTHRMMJle6UumoQROUHxffoJCLUg00fOwalrKn");
const OrderSummary = () => {
  
  const { total, subTotal,cart,coupon, isCouponApplied } = useCartStore();

  const savings = (subTotal-total ).toFixed(2)
 

   async function handlePayment () {
    const payment = await stripe
    const res  = await axios.post("/payments/create-payment-session", {products:cart,couponCode:coupon? coupon.code:null})
    const {url} = res.data
  
    console.log("payment ",res.data)
    console.log("total,subTotal,Savings",total,subTotal,savings,coupon)

   if(url){
    window.location.assign(url)
   }
    if (payment.error){
      console.error('paymentError' ,payment.error.message)
    }
  }
  
  return (
    <div>
      <div className="w-fit  ">
        <section className="bg-gray-900 w-full mx-8 my-4 p-2 text-center border-gray-600 border-2 rounded-md">
          <h3 className="text-xl font-semibold py-2 text-emerald-500">
            Order summary
          </h3>
          <div className="flex flex-col px-2">
            <div className="flex justify-between py-2 ">
              <p>Original Price</p>
              <p>₹ {subTotal}</p>
             
            </div>
            {savings>0 && isCouponApplied&&(

            <div className="flex justify-between py-2 ">
              <p>Savings </p>
              <p>- ₹ {savings}</p>
            </div>

            )

            }
            {coupon && isCouponApplied && (
              <div className="flex justify-between py-2 ">
                <p className="text-sm">Discount </p>
                <p> {coupon?.discount} %</p>
              </div>
            )}
            <hr className="h-3 text-gray-500 mt-3"></hr>
            {isCouponApplied ? ( <div className="flex justify-between text-emerald-500 ">
              <p className=" ">Total Price</p>
              <p>₹ {total.toFixed(2)}</p>
            </div>):(<div className="flex justify-between text-emerald-500 ">
              <p className=" ">Total Price</p>
              <p>₹ {subTotal.toFixed(2)}</p>
            </div>)}
           
            <button onClick={handlePayment} className="bg-emerald-800 hover:bg-emerald-700 transition-colors duration-200 cursor-pointer mt-4 rounded-md  py-2 ">
              Proceed to checkout{" "}
            </button>
            <p className=" flex justify-center items-center gap-2 text-sm my-3 text-nowrap   ">
              {" "}
              <span className="text-s"> or</span>{" "}
              <Link
                to={"/"}
                className="text-emerald-600 underline  underline-offset-4 cursor-pointer"
              >
                {" "}
                continue shopping{" "}
                <ArrowRight className="size-4 inline-block " />
              </Link>
            </p>
          </div>
        </section>
        
      </div>
      <GiftVoucher/>
    </div>
  );
};

export default OrderSummary;
