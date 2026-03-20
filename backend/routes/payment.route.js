import express from "express"
import {createPaymentSession,checkoutSuccess} from "../controllers/payment.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router=express.Router()

router.post("/create-payment-session",protectRoute,createPaymentSession)
router.post("/checkout-success",protectRoute,checkoutSuccess)

export default router