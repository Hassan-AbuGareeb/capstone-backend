const mongoose = require("mongoose");
const validator = require('validator');


const restaurantSchema = new mongoose.Schema({
    ein: { //employer identification number
            type: String,
            required: [true, 'Employer Identification Number is required'],
            unique: [true, 'Employer Identification Number has to be unique']
    },
    title: {
            type: String,
            required: [true, 'Title is required'],
            unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: value => validator.isEmail(value),
            message: 'Invalid Email format'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate: [{
            validator: value => {
                if (value.length < 8) {
                    throw new Error("Password must be at least 8 characters");
                }
                return true;
            }
        },
        {
            validator: value => {
                if (!/[a-z]/.test(value)) {
                    throw new Error("Password must contain at least 1 lowercase letter");
                }
                return true;
            }
        },
        {
            validator: value => {
                if (!/[A-Z]/.test(value)) {
                    throw new Error("Password must contain at least 1 uppercase letter");
                }
                return true;
            }
        },
        {
            validator: value => {
                if (!/\d{2,}/.test(value)) {
                    throw new Error("Password must contain at least 2 digits");
                }
                return true;
            }
        }]
    },
    location: {
        type: [String],
        required: [true, 'Restaurant needs to serve at least 1 location needs to be selected']
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: value => {
                if (!/^\d{10}$/.test(value)) {
                    throw new Error('Phone number must be 10 digits')
                }
                return true
            }
        }
    },
    menu: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
    category: {
        type: [String],
        required: [true, 'Restaurant needs to have at least 1 category']
    },
    image: {
        type: String,
    },
    rating: {
        type: Number,
        default: 0
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
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
