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
    type: Buffer,
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: [true, 'Item price is required']
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
        enum: ["required", "optional"],
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
        type: Number,
        required: false
      }
    }
  ]
  
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
