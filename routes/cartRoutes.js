const express = require("express");
const router = express.Router();

const { 
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem,
} = require("../controllers/cartController");

router.post("/", addToCart);
router.get("/", getCart);
router.put("/items/:productId", updateCartItem);
router.delete("/items/:productId", removeCartItem);

module.exports = router;