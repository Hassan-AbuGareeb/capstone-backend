const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  //itemId:{
  //    type: mongoose.Schema.Types.ObjectId,
  //    required: true,
  //   unique: true
  // },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  category: {
    type: String,
    enum: ["Desserts", "Breakfast", "Traditional", "Beverages", "Snacks"],
    default: "uncategorized",
  },
});

const item = mongoose.model("Item", itemSchema);

module.exports = item;
