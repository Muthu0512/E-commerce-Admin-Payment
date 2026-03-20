import  stripe  from "../lib/stripe.js";
import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import dotenv from "dotenv";


dotenv.config();

export const createPaymentSession = async (req, res) => {
  try {
    const { products, couponCode } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "products array is empty" });
    }

    let totalAmount = 0;

    const lineItems = products.map((product) => {
      const amount = Math.round(product.price*100);
      totalAmount += amount * product.quantity;

      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: amount,
        },
        quantity:product.quantity
      };
    });

    let coupon = null;

    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        userId: req.user._id,
        isActive: true,
      });
      if (coupon) {
        totalAmount -= Math.round((totalAmount * coupon.discount)/100);
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
      discounts: coupon
        ? [
            {
              coupon: await createStripeCoupon(coupon.discount),
            },
          ]
        : [],
      metadata: {
        userId: req.user._id.toString(),
        couponCode: couponCode || "",
        products: JSON.stringify(
          products.map((product) => ({
            id: product._id,
            quantity: product.quantity,
            price: product.price,
          }))
        ),
      },
    });
    if (totalAmount > (2000*100)) {
      await createNewCoupon(req.user._id);
    }
    res.status(200).json({ id: session.id, totalAmount: totalAmount,url:session.url });
  } catch (error) {
    console.log("Error from create payment controller", error.message);
    res.status(500).json({ message: "server error", Error: error.message });
  }
};

export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const existingOrder = await  Order.findOne({stripeSessionId:sessionId})

    if(existingOrder){
      return res.status(200).json({sucess:true,message:"Order already processed "})
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      if (session.metadata.couponCode) {
        await Coupon.findOneAndUpdate(
          {
            code: session.metadata.couponCode,
            userId: session.metadata.userId,
          },
          { isActive: false }
        );
      }
    //     if (totalAmount > (2000*100)) {
    //   await createNewCoupon(session.metadata.userId);
    // }
      const products = JSON.parse(session.metadata.products)
      const newOrder = new Order({
        user:session.metadata.userId,
        products:products.map(product =>({
            product:product.id,
            quantity:product.quantity,
            price:product.price
        })),
        totalAmount:session.amount_total/100,
        stripeSessionId:sessionId
      })
      await newOrder.save()

      res.status(200).json({
        message:"payment successful and order created",
        orderId:newOrder._id
      })
    }
  } catch (error) {
    console.log("error from checkoutsuccess controller " ,error.message)
    res.status(500).json({message:"server error", Error:error.message})
  }
};

async function createStripeCoupon(discount) {
  const coupon = await stripe.coupons.create({
    percent_off: discount,
    duration: "once",
  });

  return coupon.id;
}

async function createNewCoupon(userId) {
  // const newCoupon = new Coupon({
  await Coupon.findOneAndDelete({userId})
  return await Coupon.findOneAndUpdate({userId:userId},
    {
    code: "NEWYEAR" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discount: Math.floor(Math.random()*(50-5+1)+5),
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    userId: userId,
    isActive:true
  },{
    upsert:true, new:true
  });

  // await newCoupon.save();
  // return newCoupon;
}
