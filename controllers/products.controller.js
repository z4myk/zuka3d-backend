const { response } = require("express");
const Products = require("../models/product");
const fs = require('fs');
const product = require("../models/product");
require("dotenv").config();


const createProductPublication = async (req, res = response) => {
  try {
    const index = req.body.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/&/g, '%26')
      .replace(/\?/g, '%3F');

    const productPublication = Products({ ...req.body, index: index });

    if (req.file) {
      const { filename } = req.file;
      productPublication.setImage(filename);
    }
    // Construir la URL completa de la imagen
    const imageURL = `${process.env.APP_HOST}:${process.env.APP_PORT}/public/${productPublication.image}`;
    productPublication.setImageURL(imageURL);

    await productPublication.save();

    // Enviar la URL de la imagen junto con los demás datos del producto
    res.status(201).json({ ...productPublication.toJSON()});
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error interno, hable con un administrador.',
      error,
    });
  }
};




  const fetchPublication = (_req, res) => {
    try{
      Products
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ msg: error }));
    }catch(error){
      console.log(error)
    }
  }

  const getOneProductPublication = async (req, res = response) => {
    const productId = req.params.id;
    try {
      const product = await Products.findById(productId);
      if (!product) {
        return res.status(404).json({
          ok: false,
          msg: "No existe un producto con esa id."
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

  const updateProductPublication = async (req, res = response) => {

    const productId = req.params.id;
    try {
      const product = await Products.findById(productId);
      if (!product) {
        return res.status(404).json({
          ok: false,
          msg: "No existe un producto con esa id."
        })
      }
  
      const updated = {
        ...req.body
      }
  
      const productUpdate = await Products.findByIdAndUpdate(productId, updated, { new: true });
  
      res.json({
        ok: true,
        product: productUpdate,
      })
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "Error interno, hable con un administrador."
      })
    }
  };

  const deleteProductPublication = (req, res = response) => {
    const { id } = req.params;
  
    // Obtener el producto antes de eliminarlo
    Products.findById(id)
      .then((product) => {
        if (!product) {
          return res.status(404).json({ msg: 'El producto no existe' });
        }
  
        // Eliminar las imágenes del storage
        if (product.image) {
          const imagePath = `./storage/imgs/${product.image}`;
          console.log(imagePath)
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ msg: 'Error al eliminar la imagen' });
            }
  
            // Eliminar el producto de la base de datos
            Products.deleteOne({ _id: id })
              .then(() => {
                res.json({ msg: 'Producto eliminado exitosamente' });
              })
              .catch((error) => {
                res.status(500).json({ msg: 'Error al eliminar el producto de la base de datos', error });
              });
          });
        } else {
          // Eliminar el producto de la base de datos si no hay imagen
          Products.deleteOne({ _id: id })
            .then(() => {
              res.json({ msg: 'Producto eliminado exitosamente' });
            })
            .catch((error) => {
              res.status(500).json({ msg: 'Error al eliminar el producto de la base de datos', error });
            });
        }
      })
      .catch((error) => {
        res.status(500).json({ msg: 'Error al obtener el producto', error });
      });
  };

  
  const getProductByCategory = async (req, res) => {
    try {
      const category = req.params.category; // Obtiene el nombre de la categoría desde los parámetros de la URL
  
      // Realiza la búsqueda de productos utilizando el campo 'category'
      const products = await Products.find({ category });
  
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        msg: "Error interno, hable con un administrador.",
        error,
      });
    }
  };



  module.exports = {
    createProductPublication,
    fetchPublication,
    updateProductPublication,
    deleteProductPublication,
    getOneProductPublication,
    getProductByCategory,
  }