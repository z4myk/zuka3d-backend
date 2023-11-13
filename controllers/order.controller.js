const { response } = require("express");
const Order = require('../models/order');
// const { transporter } = require('../libs/nodemailer');
const createOrderPublication = async (req, res = response) => {
    try {
    

      const orderPublication = Order({...req.body});

      await orderPublication.save();
  
      // Enviar la URL de la imagen junto con los demás datos del producto
      res.status(201).json({ ...orderPublication.toJSON()});
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Error interno, hable con un administrador.',
        error,
      });
    }
  };

  

  const fetchOrdersPublications = (_req, res) => {
    try{
        Order
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ msg: error }));
    }catch(error){
      console.log(error)
    }
  }

  const getOneOrderPublication = async (req, res = response) => {
    const orderId = req.params.id;
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({
          ok: false,
          msg: "No existe un pedido con esa id."
        });
      }
  
      res.status(200).json({
        ok: true,
        msg: order
      })
  
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "Error interno, hable con un administrador.",
        error
      })
    }
  };

  const deleteOrderPublication = (req, res = response) => {
    try {
      const { id } = req.params;
      Order
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


  const updateOrderPublication = async (req, res = response) => {

    const orderId = req.params.id;
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({
          ok: false,
          msg: "No existe una orden con esa id."
        })
      }
  
      const updated = {
        ...req.body
      }
  
      const orderUpdate = await Order.findByIdAndUpdate(orderId, updated, { new: true });
  
      res.json({
        ok: true,
        order: orderUpdate,
      })
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "Error interno, hable con un administrador."
      })
    }
  };


  const updateOrderStatus = async (req, res) => {
    const orderId = req.params.id; 
    const { status } = req.body; 
    const { trackingCode } = req.body; 
    try {
      // Actualiza el estado del pedido solo si el campo "status" o "trackingCode" está presente
      if (status) {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status, trackingCode }, { new: true });
  
        if (!updatedOrder) {
          return res.status(404).json({ message: 'Pedido no encontrado' });
        }
  
        return res.status(200).json(updatedOrder);
      } else {
        return res.status(400).json({ message: 'Se requiere el campo "status" en la solicitud' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  };

  module.exports = {
      createOrderPublication,
      fetchOrdersPublications,
      getOneOrderPublication,
      deleteOrderPublication,
      updateOrderPublication,
      updateOrderStatus,


  }



