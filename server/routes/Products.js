import express from "express";
import { list, productPage, addToCart } from "../controllers/Products.js";
import { validateToken } from "../validate/ValidateToken.js";

const router = express.Router();

router.get("/list", list);
router.post("/add-to-cart", validateToken, addToCart);
router.get("/:id", productPage);

export default router;
