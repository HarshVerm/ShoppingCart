const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const cartSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    cart_list: {
      type: Array,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model("cartlist", cartSchema);
