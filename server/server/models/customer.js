const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
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

const basketSchema = mongoose.Schema({
        itemId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        }],
        notes: String,
        quantity: {
            type: Number,
            required: true,
        },
})

const customerSchema = mongoose.Schema({

        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            validate: {
                validator: value => validator.isEmail(value),
                message: 'Invalid email format'
            }
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            validate: [
                {
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
                }
            ]
        },
        firstName: {
            type: String,
            required: [true, 'First name is required']
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required']
        },
        age: {
            type: Number,
            required: [true, 'Age is required']
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
        location: {
            type: String,
            required: [true, 'Location is required']
        },
        basket: {
            type: basketSchema,
            default: {},
            required: true
        },
        orders: {
            type: orderSchema,
            default: {},
            required: true
        },
        favourites: {
            itemId: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item'
            }],
        }
    }
)

const Customer = mongoose.model('Customer', customerSchema)
module.exports = Customer