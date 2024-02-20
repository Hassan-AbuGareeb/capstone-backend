const mongoose = require('mongoose');

// Define the order schema
const orderSchema = new mongoose.Schema({
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true
    },
    itemId: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item'
    }],
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed'],
      default: 'Pending'
    },
    creationDate: {
      type: Date,
      default: Date.now
    },
    totalBill: {
      type: mongoose.Schema.Types.Decimal128
    }
});
