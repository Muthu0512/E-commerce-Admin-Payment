import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import {getCartItem,addItemToCart,updateCart,deleteCartItem,clearCart} from "../controllers/cart.controller.js"

const router = express.Router()

router.get('/',protectRoute,getCartItem)
router.post('/',protectRoute,addItemToCart)
router.put('/:id',protectRoute,updateCart)
router.delete("/",protectRoute,deleteCartItem)
router.delete("/clear-all",protectRoute,clearCart )

export default router