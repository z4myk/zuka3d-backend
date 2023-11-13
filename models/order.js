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
    address: {
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
        type: Number,
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
        type: Array,
        required: true,
    },
    totalPrice:{
        type: Number,
        required: true,
    },
    terms:{
        type: Boolean,
        required: true,
    },
    status:{
        type: String,
        required: true,
    },
    trackingCode: {
        type: String,
    },
    date:{
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Order', orderSchema);


