const express = require("express");
const router = express.Router();

const { getCart, addToCart } = require("../Controller/cart-controller");

router.get("/cart/:id", getCart);
router.post("/addToCart/:id", addToCart);

module.exports = router;
