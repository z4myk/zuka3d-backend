const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Role = require("../models/role")
const SECRET = process.env.SECRET_SEED;


const verifyToken = async(req, res, next) => {

    try{
        const token = req.headers["x-access-token"];

        if(!token) return res.status(403).json({message: "No token provided"})
        
       const decoded = jwt.verify(token, SECRET)
        req.userId = decoded.id;
        const user = await User.findById(req.userId, {password: 0})
    
        if(!user) return res.status(404).json({message: "No user found"})
        next()

    }catch(error){
        return res.status(401).json({message: 'unathourized'})
    }
  
}


const renewToken = async (req, res) => {
    try {
      const userId = req.userId; // Extrae el ID del usuario del token ya validado
  
      const user = await User.findById(userId, { password: 0 });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Genera un nuevo token
      const newToken = jwt.sign({ id: user._id }, SECRET, {
        expiresIn: "86400", // o la duración que prefieras
      });
  
      res.json({ token: newToken, user }); // Envía el nuevo token y los datos del usuario
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  



const isAdmin = async (req, res, next) => {

    const user = await User.findById(req.userId);

    const roles = await Role.find({_id: {$in: user.roles } })

    const isAdmin = roles.some(role => role.name === "administrador");

        if (isAdmin) {
            next();
        } else {
            return res.status(400).json({message: "Require admin role"});
        }

}

module.exports = {
    verifyToken,
    renewToken,
    isAdmin,
}