const express = require("express");
const router = express.Router();

const { placeOrder, checkout } = require("../Controller/order-controller");

// router.get("/orders", getOrder);
router.post("/order", checkout);
router.post("/capture/:paymentId", placeOrder);

module.exports = router;
