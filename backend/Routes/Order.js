const express = require("express");
const router = express.Router();

const {
  placeOrder,
  checkout,
  getAllOdersByUser,
} = require("../Controller/order-controller");

// router.get("/orders", getOrder);
router.post("/order", checkout);
router.post("/capture/:paymentId", placeOrder);
router.post("/get-all-orders", getAllOdersByUser);

module.exports = router;
