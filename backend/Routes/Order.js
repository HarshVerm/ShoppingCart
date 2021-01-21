const express = require("express");
const router = express.Router();

const {
  addOrder,
  getOrder,
  getOrderbyId,
} = require("../Controller/order-controller");

router.get("/orders/:id", getOrder);
router.post("/order/add", addOrder);
router.post("/order/:id", getOrderbyId);

module.exports = router;

//
// [
//     {
//       id: "6003683c6f45c6efabd28c0d",
//       img:
//         "https://cdn.shopify.com/s/files/1/2028/6907/products/FRONT_4aa70174-6e93-458b-9e21-347a0a943a49_900x.png?v=1606169844",
//       price: 50,
//       product_name: "ANIME BLACK HOODIE",
//       qty: 3,
//       size: "Small",
//     },
//     {
//       id: "60034dee6f45c6efabce5e4f",
//       img:
//         "https://cdn.shopify.com/s/files/1/2028/6907/products/MOCK_2237ba95-c8f2-4dc4-871b-bb01362b94aa_900x.png?v=1606169715",
//       price: 35,
//       product_name: "U R A STAR BLACK LONG SLEEVE",
//       qty: 1,
//       size: "Small",
//     },
//   ];
