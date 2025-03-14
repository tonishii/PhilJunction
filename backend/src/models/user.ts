import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  username: string;
  email: string;
  description?: string;
  icon?: { data: Buffer; contentType: string };
  password: string;
  dateCreated?: Date;
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
  icon: { data: Buffer, contentType: String },
  password: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
})

module.exports = mongoose.model("User", userSchema);
