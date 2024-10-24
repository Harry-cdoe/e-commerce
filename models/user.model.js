const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['customer', 'admin'],
            default: 'customer'
        },
        profile: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile',
        },
        shippingAddresses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address'
        }],
        paymentMethod: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PaymentMethod'
        }],
        orders: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }],
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);