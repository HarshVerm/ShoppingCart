const express = require("express");
const router = express.Router();
const { getData, getById } = require("../Controller/product-contoller");

router.get("/products", getData);
router.get("/product/:id", getById);

module.exports = router;
