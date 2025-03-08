import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
  icon: { data: Buffer, contentType: String },
  password: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
})

module.exports = mongoose.model("User", userSchema);