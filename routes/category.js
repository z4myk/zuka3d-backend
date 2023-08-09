const express = require("express");
const {
    createCategoryPublication,
    getOneCategoryPublication,
    fetchCategoryPublication,
    updateCategoryPublication,
    deleteCategoryPublication,
} = require('../controllers/category.controller');

const router = express.Router();


 //create category
 router.post('/category', createCategoryPublication);

 // get all pcategory
 router.get('/category', fetchCategoryPublication);

 //get one category
 router.get('/category/:id', getOneCategoryPublication);

 //update category
 router.put('/category/:id', updateCategoryPublication);

 //delete category
 router.delete('/category/:id', deleteCategoryPublication);

 
 module.exports = router;