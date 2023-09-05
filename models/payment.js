const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    bank: {
        type: String,
        required: true,
    },
    numberOperation: {
        type: String,
        required: true,
    },
    comments:{
        type: String,
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
    },

}, {
    timestamps: true,
});

module.exports = mongoose.model('Payment', paymentSchema);


