const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Role = require("../models/role")
const SECRET = process.env.SECRET_SEED;

const registerUser = async (req, res) => {
  try {
    const { email, password, roles } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = new User({
      email,
      password: await User.encryptPassword(password),
    });

    if(roles) {
      const foundRoles = await Role.find({name: {$in: roles}})
      user.roles = foundRoles.map(role => role._id )
    }else{
      const role = await Role.findOne({name: "usuario"})
      user.roles = [role._id];
    }


    const savedUser = await user.save();
    console.log(savedUser)

    const token = jwt.sign({id: savedUser._id }, SECRET, {
      expiresIn: '86400' //24hs
    })

    res.status(201).json({ token, user: savedUser, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({email}).populate("roles");

    if(!userFound) return res.status(400).json({message: "User not found"})

    console.log(userFound)
    
    const matchPassword = await User.comparePassword(password, userFound.password)
    if(!matchPassword) return res.status(401).json({token: null, message: "Invalid password" });
    

    const token = jwt.sign({id: userFound._id }, SECRET, { expiresIn: "86400" });

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