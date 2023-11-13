const User = require("../models/User");
const Role = require("../models/role");
const { newToken } = require("../helpers/jwt");

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const role = await Role.findOne({name: "usuario"})

    const user = new User({
      email,
      password: await User.encryptPassword(password),
      roles:role._id
    });

    const savedUser = await user.save();
    const token = await newToken(savedUser._id);

    res.status(201).json({ token, user: savedUser, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({email}).populate("roles");

    if(!userFound) return res.status(400).json({message: "Email no encontrado"})

    console.log(userFound)
    
    const matchPassword = await User.comparePassword(password, userFound.password)
    if(!matchPassword) return res.status(401).json({token: null, message: "La contraseña es invalida" });
    
    const token = await newToken(userFound._id);

    res.json({ 
      user: userFound,
      token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    loginUser,
    registerUser,
}