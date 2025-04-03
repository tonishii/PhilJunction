import mongoose from 'mongoose';
import fs from 'fs';

// Sets the default icon
const defaultIcon = fs.readFileSync('./src/public/defaultIcon.png');

export interface IUser extends mongoose.Document {
  username: string;
  email: string;
  description: string;
  icon: { data: Buffer; contentType: string };
  password: string;
  dateCreated: Date;
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
  icon: {
    data: { type: Buffer, default: defaultIcon },
    contentType: { type: String, default: 'image/png' }
  },
  password: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
})

const User = mongoose.model<IUser>("User", userSchema);
export default User;
