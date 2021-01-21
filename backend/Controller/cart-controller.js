const Cart = require("../Models/cart");

const getCart = (req, res) => {
  const id = req.params.id;
  //   const cart = req.body;
  console.log(req.params);
  Cart.find({ user_id: id }).then((data) => {
    // console.log(data);
    if (data.length === 0) {
      const newCart = new Cart({ user_id: id, cart_list: [] });
      newCart.save().then((data) => {
        console.log(data);
        res.status(200).send({
          data,
        });
      });
    } else {
      res.send(data);
    }
  });
};

const addToCart = (req, res) => {
  const id = req.params.id;
  console.log(req.body, "abbaaaaaaaaaa");
  Cart.find({ user_id: id }).then((data) => {
    console.log(data, "data");
    if (data.length === 0) {
      const newCart = new Cart({
        user_id: id,
        cart_list: req.body,
      });
      newCart.save().then((data) => {
        // console.log(data);
        res.status(200).send({
          data,
        });
      });
    } else {
      let newCart = data[0].cart_list.push(req.body);
      Cart.updateOne({ user_id: id }, { cart_list: newCart }).then((data) => {
        res.send(data);
      });
    }
  });
};

module.exports = { getCart, addToCart };
