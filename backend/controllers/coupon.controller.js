import Coupon from "../models/coupon.model.js";

export const getCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findOne({ userId: req.user._id, isActive: true });

    if (!coupon) {
     return res.status(404).json({ message: "no coupons found" });
    }
    res.json(coupon || null);
  } catch (error) {
    console.log("error from getCoupon controller", error.message);
    res.status(500).json({ message: "server error", Error: error.message });
  }
};

export const validateCoupon = async (req, res) => {
  try {
    const {code} = req.body;

    const coupon = await Coupon.findOne({
      code: code,
      isActive: true,
      userId: req.user._id,
    });

    if (!coupon) {
      return res.status(404).json({ message: "no coupon found or invalid" });
    }
    if (coupon.expiryDate < new Date()) {
      (coupon.isActive = false), await coupon.save();
      return res.status(400).json({ message: "coupon got expired" });
    }
    res.json({ 
      message: "coupon is valid",
      code: coupon.code,
      discount: coupon.discount,
    });
  } catch (error) {
    console.log("Error from validateCoupon controller", error.message);
    res.status(500).json({ message: "server error", Error: error.message });
  }
};
