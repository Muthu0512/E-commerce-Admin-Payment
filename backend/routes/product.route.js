import express from "express";
import {
  getAllProuducts,
  getRecommendedProducts,
  getFeaturedProducts,
  createProduct,
  deleteProduct,
  getByCategory,
  toogleFeaturedProduct
} from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProuducts);
router.post("/create", protectRoute, adminRoute, createProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);
router.patch("/:id", protectRoute, adminRoute, toogleFeaturedProduct);
router.get("/featured", getFeaturedProducts);
router.get("/recommended", getRecommendedProducts);
router.get("/category/:category", getByCategory);

export default router;
