const express = require("express");
const upload = require("../libs/storage");
const {
  createProductPublication,
  fetchPublication,
  updateProductPublication,
  deleteProductPublication,
  getOneProductPublication,
  getProductByCategory,
} = require("../controllers/products.controller");

const router = express.Router();

//create product
router.post("/products", upload.single("image"), createProductPublication);

// get all products
router.get("/products", fetchPublication);

//get one product
router.get("/products/:id", getOneProductPublication);

router.get('/products/category/:category', getProductByCategory);

//update product
router.put("/products/:id", updateProductPublication);

//delete product
router.delete("/products/:id", deleteProductPublication);

module.exports = router;
