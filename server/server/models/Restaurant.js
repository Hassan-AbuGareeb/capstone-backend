const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
    {
        EIN: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
            
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        location: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        tradeNumber: {
            type: String,
            required: true
        },
        commercialRegistartionNumber: {
            type: String,
            required: true,
            unique: true
        },
        rating: {
            type: Number
        },
        reviews: [{
            customerId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Customer'
            },
            rating: {
                type: Number
            },
            review: {
                type: String
            }
        }] 
    }
)

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
