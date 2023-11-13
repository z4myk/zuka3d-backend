const { response } = require("express");
const Category = require("../models/category");
require("dotenv").config();


const createCategoryPublication = async (req, res = response) => {
  try {
    if (!req.body.cat) {
      throw new Error('Category name is missing.');
    }

    const index = req.body.cat
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/&/g, '%26')
      .replace(/\?/g, '%3F');

    const categoryPublication = Category({ ...req.body, index: index });
    await categoryPublication.save();

    res.status(201).json({ ...categoryPublication.toJSON() });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error interno, hable con un administrador.',
      error,
    });
  }
};


  const fetchCategoryPublication = (_req, res) => {
    try{
        Category
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ msg: error }));
    }catch(error){
      console.log(error)
    }
  }

  const getOneCategoryPublication = async (req, res = response) => {
    const categoryName = req.body.cat;
    try {
      const cat = await Category.findById(categoryName);
      if (!cat) {
        return res.status(404).json({
          ok: false,
          msg: "No existe una categoria con ese nombre."
        });
      }
  
      res.status(200).json({
        ok: true,
        msg: product
      })
  
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "Error interno, hable con un administrador.",
        error
      })
    }
  };

  const updateCategoryPublication = async (req, res = response) => {

    const categoryId = req.params.id;
    try {
      const cat = await Category.findById(categoryId);
      if (!cat) {
        return res.status(404).json({
          ok: false,
          msg: "No existe un producto con esa id."
        })
      }
  
      const updated = {
        ...req.body
      }
  
      const categoryUpdate = await Category.findByIdAndUpdate(categoryId, updated, { new: true });
  
      res.json({
        ok: true,
        cat: categoryUpdate,
      })
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "Error interno, hable con un administrador."
      })
    }
  };

  const deleteCategoryPublication = (req, res = response) => {
    try {
      const { id } = req.params;
      Category
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ msg: error }))
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "Error interno, hable con un administrador.",
        error
      })
    }
  }

  module.exports = {
      createCategoryPublication,
      getOneCategoryPublication,
      fetchCategoryPublication,
      updateCategoryPublication,
      deleteCategoryPublication,
  }