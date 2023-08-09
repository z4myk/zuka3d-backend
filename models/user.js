// models/User.js
const mongoose = require("mongoose");
const Schema = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
    
}
}, { 
 timestamps: true,
 versionKey: false,
}

);

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt);
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
 return await bcrypt.compare(password, receivedPassword)

}
module.exports = mongoose.model("User", userSchema);