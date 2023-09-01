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
const {verifyToken, isAdmin} = require('../middlewares/index');

const router = express.Router();


//create product
router.post("/products", upload.single("image"), [verifyToken, isAdmin], createProductPublication);

// get all products
router.get("/products", fetchPublication);

//get one product
router.get("/products/:id", getOneProductPublication);

//get products by category
router.get('/products/category/:category', getProductByCategory);

//update product
router.put("/products/:id", [verifyToken, isAdmin], updateProductPublication);

//delete product
router.delete("/products/:id", [verifyToken, isAdmin], deleteProductPublication);

module.exports = router;
