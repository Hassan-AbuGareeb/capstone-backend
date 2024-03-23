const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  name: {
    type: String,
    required: [true, 'Item name is required'],
    unique: [true, 'Item has been already added to the menu']
  },
  description: {
    type: String,
    required: [true, 'Item description is required'],
  },
  image: {
    type: String,
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: [true, 'Item price is required']
  },
  category: {
    type: [String],
    enum: ["Asian", "Bakery", "Beverages", "Breakfast", "Brunch", "Burgers", "Cafe", "Desserts", "Donuts", "Fast Food", "Grill", "Ice Cream", "Indian", "Italian", "Juices", "Middle Eastern", "Mexican", "Pastries", "Pizza", "Salads", "Sandwiches", "Seafood", "Smoothies", "Snacks", "Soups", "Traditional", "Vegan", "Vegetarian", "Wraps"],
    required: [true, 'Item needs to have at least 1 category']
  },
  customFields: [
    {
      required: false,
      title: {
        type: String,
        required: true
      },
      fieldType: {
        type: String,
        enum: ["Required", "Optional"],
        required: true
      },
      minSelection: {
        type: Number,
        required: true
      },
      maxSelection: {
        type: Number,
        required: false
      },
      options: {
        type: [String],
        required: true
      },
      additionalPrice: {
        type: mongoose.Schema.Types.Decimal128,
        required: false
      }
    }
  ]
  
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
