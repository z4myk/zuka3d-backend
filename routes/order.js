const express = require("express");
const router = express.Router();
const {
  createOrderPublication,
  fetchOrdersPublications,
  getOneOrderPublication,
  deleteOrderPublication,
  updateOrderPublication,
  updateOrderStatus
} = require("../controllers/order.controller");

router.post("/orders", createOrderPublication);

router.get("/orders", fetchOrdersPublications);

router.get("/orders/:id", getOneOrderPublication);

router.put("/orders/:id", updateOrderStatus);

router.put("orders/:id", updateOrderPublication);

router.delete("/orders/:id", deleteOrderPublication);

module.exports = router;
