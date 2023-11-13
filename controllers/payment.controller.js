const { response } = require("express");
const Payment = require("../models/payment");
const Order = require("../models/order");

const createOrderNotified = async (req, res = response) => {
  try {
    const { paymentId, ...otherPaymentData } = req.body;

    // Verificar si el paymentId coincide con el _id de la orden
    const order = await Order.findById(paymentId);

    if (!order) {
      return res.status(404).json({
        ok: false,
        msg: "Orden no encontrada",
      });
    }

    // Verificar si ya existe un aviso de pago con el mismo paymentId
    const existingPayment = await Payment.findOne({ paymentId });

    if (existingPayment) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe un informe de pago en este pedido",
      });
    }
    // Cambiar el estado de la orden a "En Proceso de Confirmación"
    console.log(req.body)
    order.status = "En Proceso de Confirmación";
    // Guardar la orden actualizada
    await order.save();

    // Crear y guardar el aviso de pago
    const avisoPago = new Payment({ 
      paymentId,
      ...otherPaymentData,
    });

    await avisoPago.save();

    res.status(201).json({ ...avisoPago.toJSON() });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error para informar el pago",
      error,
    });
  }
};

const fetchOrderNotified = (_req, res) => {
  try {
    Payment.find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ msg: error }));
  } catch (error) {
    console.log(error);
  }
};


const getOneOrderNotified = async (req, res = response) => {
  const paymentId = req.params.id;
  try {
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un informe de pago con esa id."
      });
    }

    res.status(200).json({
      ok: true,
      msg: payment
    })

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno, hable con un administrador.",
      error
    })
  }
};

const deleteOrderNotified = (req, res) => {
  
  try {
    const { id } = req.params;
    Payment
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
  createOrderNotified,
  fetchOrderNotified,
  getOneOrderNotified,
  deleteOrderNotified,

};
