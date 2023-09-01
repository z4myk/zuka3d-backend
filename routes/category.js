const express = require("express");
const {
    createCategoryPublication,
    getOneCategoryPublication,
    fetchCategoryPublication,
    updateCategoryPublication,
    deleteCategoryPublication,
} = require('../controllers/category.controller');
const {verifyToken, isAdmin} = require('../middlewares/index');
const router = express.Router();


 //create category
  //agregarle los middlewares verifyToken y isAdmin
 router.post('/category',  createCategoryPublication);

 // get all pcategory
 router.get('/category', fetchCategoryPublication);

 //get one category
 router.get('/category/:id', getOneCategoryPublication);

 //update category
 router.put('/category/:id', [verifyToken, isAdmin], updateCategoryPublication);

 //delete category

 //agregarle los middlewares verifyToken y isAdmin
 router.delete('/category/:id',  deleteCategoryPublication);

 
 module.exports = router;