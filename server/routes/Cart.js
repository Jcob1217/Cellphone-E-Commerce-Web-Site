import express from "express";
import { addRemoveCart, getCartData, updateCart } from "../controllers/Cart.js";
import { validateToken } from "../validate/ValidateToken.js";

const router = express.Router();

router.get("/", validateToken, getCartData);
router.put("/update", validateToken, updateCart);
router.post("/update", validateToken, addRemoveCart);

export default router;
