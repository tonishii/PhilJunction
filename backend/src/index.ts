import express, { Express, Request, response, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { corsOptions } from "./corsOptions";
import mongoose, { connect, disconnect, model, MongooseOptions, Schema } from "mongoose";
const User = require('./models/user');
const Post = require('./models/post')

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const databaseURL = "mongodb://localhost:27017/LR2TDB";
const db = mongoose.connect(databaseURL);
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

app.get("/", async (req: Request, res: Response) => {
  res.send("Express + TypeScript Serverrrrr");
});

app.post("/register", async (req: Request, res: Response): Promise<any> => {
  const { username, email, password, confirmPW } = req.body;

  if (!username || !email || !password || !confirmPW)
    return res.status(400).json({ message: req.body });
  
  if(password !== confirmPW)
    return res.status(400).json({message: 'Passwords do not match.'});
  
  try {
    const user = await User.findOne({ username, email, password }).exec();
    if(user)
      return res.status(400).json({message: 'Account already exists.'});
  
    await User.create({...req.body})
    return res.status(201).json({ message: 'User registered successfully'});
  }
  catch (error: any) {
    console.error("Error during registration:", error);
    console.log(error);
    return res.status(500).json({ message: "Internal server error.", error: error.message });
  }
}); 

app.post("/login", async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    const user = await User.findOne({ username, password }).exec();
    if(user)
      return res.status(201).json({ message: 'User login successfully'});
    else
      return res.status(400).json({message: 'Account does not exist.'});
    }
  catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});

app.post("/submitpost", async (req: Request, res: Response): Promise<any> => {
  const {postTitle, postContent, images, tags} = req.body;

  if (!postTitle || !postContent || !tags)
    return res.status(400).json({ message: req.body });
  
  try {
    const user = await User.findOne({}).exec();
    if(user)
    {
      Post.create({...req.body, "userId" : user._id})
      return res.status(201).json({ message: 'Post created successfully'});
    }
    else
      return res.status(400).json({ message: "wip"});
  }
  catch (error: any) {
    console.error("Error during registration:", error);
    console.log(error);
    return res.status(500).json({ message: "Internal server error.", error: error.message });
  }
}); 

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});