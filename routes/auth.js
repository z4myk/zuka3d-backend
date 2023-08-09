const express = require("express");
const router = express.Router();
const { loginUser, registerUser } = require("../controllers/auth.controller");

// Ruta para registro de usuario
router.post("/register", registerUser);

// Ruta para inicio de sesión
router.post("/login", loginUser);

module.exports = router;