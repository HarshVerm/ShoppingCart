const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const {
  getCart,
  addToCart,
  emptyCart,
  removeById,
  changeQuantity,
} = require("../Controller/cart-controller");

router.get("/cart/:id", getCart);
router.post("/addToCart", addToCart);
router.delete("/removeProduct/:id", removeById);
router.delete("/removeCart/:id", emptyCart);
router.put("/changeQuantity/:id", changeQuantity);

module.exports = router;

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.SECRET_KEY_TO_ACCESS, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}
