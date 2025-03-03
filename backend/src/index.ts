import express, { Express, Request, response, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { corsOptions } from "./corsOptions";
import mongoose, { connect, disconnect, model, MongooseOptions, Schema } from "mongoose";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const databaseURL = "mongodb://localhost:27017/LR2TDB";
const mongoOptions: MongooseOptions = {};

interface IUser {
  name: string;
  email: string;
  avatar?: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String
});


const User = model<IUser>('User', userSchema);
run().catch(err => console.log(err));

async function run() {
  // 4. Connect to MongoDB
  await connect('mongodb://127.0.0.1:27017/test');

  const respose = await User.find({});
  console.log(respose);
  const user = new User({
    name: 'Bill' + Math.random(),
    email: 'bill@initech.com',
    avatar: 'https://i.imgur.com/dM7Thhn.png'
  });
  await user.save();

  console.log(user.email); // 'bill@initech.com'\
}

app.use("*", cors(corsOptions), (req, res, next) => next())

app.get("/", async (req: Request, res: Response) => {
  await run();
  res.send("Express + TypeScript Serverrrrr");
});

app.get("/databaseblahblah", async (req: Request, res: Response) => {

  await connect('mongodb://127.0.0.1:27017/test');
  const respose = await User.find({});
  res.json({ bro: respose });
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});