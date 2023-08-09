const mongoose = require("mongoose");
require("dotenv").config();
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    index: {
        type: String,
        required: true,
        unique: true,
      },
      image: {
          type: String,
      },
      imageURL: {
          type: String,
      },
      category: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
        unique: true,
      },
      price: {
          type: Number,
          required: true,
      },
      height: {
          type: Number,
          required: true,
      },
      broad: {
          type: Number,
          required: true,
      },
      depth: {
          type: Number,
          required: true,
      }, 
    }, {
        timestamps: true,
    
    });

    productSchema.methods.setImage = function setImage (filename) {
        this.image = `${filename}`;
    }

    productSchema.methods.setImageURL = function setImageURL(url) {
        this.imageURL = url;
      };

    module.exports = mongoose.model("Products", productSchema);


