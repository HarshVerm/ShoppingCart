const Order = require("../Models/order");

const addOrder = (req, res) => {
  console.log(req.body);
  const newOrder = new Order(req.body);
  newOrder.save().then(() =>
    res.status(200).send({
      error: false,
      message: "Order Successful",
      orderInfo: newOrder,
    }),
  );
};

const getOrder = (req, res) => {
  console.log(req.params.id);
  Order.find({ user_id: req.params.id }).then((data) => {
    if (data.length != 0) {
      return res.status(200).json(data);
    }
    return res.status(404).send({ Error: true, msg: "No orders found" });
  });
};

const getOrderbyId = (req, res) => {
  Order.findOne({ _id: req.body.id }).then((data) => {
    if (data.length != 0) {
      return res.status(200).json(data);
    }
    return res.status(404).send({ Error: true, msg: "invalid order id" });
  });
};

module.exports = { addOrder, getOrder, getOrderbyId };
