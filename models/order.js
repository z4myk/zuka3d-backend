const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    region: {
        type: String,
        required: true,
    },
    comuna: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    rut: {
        type: String,
        required: true,
    },
    details:{
        type: String,
        required: true,
    },
    totalPrice:{
        type: Number,
        required: true,
    },
    status:{
        type: Number,
        required: true,
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Order', orderSchema);


