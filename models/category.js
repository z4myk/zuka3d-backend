const mongoose = require("mongoose");
require("dotenv").config();

const categorySchema = mongoose.Schema({
    cat: {
        type: String,
        required: true,
    },
    index: {
        type: String,
        required: true,
        unique: true,
      },
    }, {
        timestamps: true,
    
    });

    module.exports = mongoose.model("Category", categorySchema);