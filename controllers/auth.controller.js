const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET = process.env.SECRET_SEED;

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = new User({
      email,
      password: await User.encryptPassword(password),
    });

    const savedUser = await user.save();

    const token = jwt.sign({id: savedUser._id } , SECRET, {
      expiresIn: '2h'
    })

    res.status(201).json({ token, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign({ userId: user._id }, "your-secret-key", { expiresIn: "1h" });

//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


module.exports = {
    loginUser,
    registerUser,
}