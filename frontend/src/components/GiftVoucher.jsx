import { useState, useEffect } from "react";
import { useCartStore } from "../stores/useCartStore";
import { toast } from "react-hot-toast";

const GiftVoucher = () => {
  const [userInputCode, setUserInputCode] = useState("");
  const { coupon, isCouponApplied, getCoupon, applyCoupon, removeCoupon } =
    useCartStore();

  useEffect(() => {
    getCoupon();
  }, [getCoupon]);
  useEffect(() => {
    if (coupon) setUserInputCode(coupon.code);
  }, [coupon]);

  async function handleApplyCoupon() {
    if(!userInputCode) return;
    await applyCoupon(userInputCode);
  }
  async function handleRemoveCoupon() {
    await removeCoupon();
    setUserInputCode("");
  }
  return (
    <div className="bg-gray-900 w-full mx-8 my-4 p-2 text-center border-gray-600 border-2 rounded-md">
      <h4 className=" font-semibold py-3 text-emerald-500">
        Do you have a voucher or gift card ?
      </h4>
      <div className="flex flex-col px-2 py-3">
        <input
          type="text  "
          id="voucher"
          value={userInputCode}
          onChange={(e) => {
            setUserInputCode(e.target.value);
          }}
          placeholder="DNMP0512"
          className="bg-gray-300/20 px-2 py-1 text-center rounded-md focus:ring-1 ring-emerald-500 outline-none"
          required
        />
        <button
          onClick={handleApplyCoupon}
          className="bg-emerald-800 hover:bg-emerald-700 transition-colors duration-200 cursor-pointer mt-4 rounded-md  py-1 "
        >
          Apply coupon{" "}
        </button>

        <p className="text-center  mt-3 text-xs text-nowrap">
          Available Coupon :
          <span className="font-bold text-emerald-400 ">{coupon?.code}</span>
        </p>
        <p className="text-center mt-3 text-xs text-nowrap">
          discount Percentage :
          {/* <span className="font-bold text-emerald-400 ">
            {coupon.discount} %
          </span> */}
        </p>
        {coupon && isCouponApplied && (
          <button
            onClick={handleRemoveCoupon}
            className="bg-red-800 hover:bg-red-700 transition-colors duration-200 cursor-pointer mt-4 rounded-md  py-1 "
          >
            Remove Coupon
          </button>
        )}
      </div>
    </div>
  );
};

export default GiftVoucher;
