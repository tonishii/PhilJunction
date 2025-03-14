import express, { Express, Request, response, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from 'multer';
import { corsOptions } from "./corsOptions";
import mongoose, { connect, disconnect, model, MongooseOptions, Schema } from "mongoose";
const User = require('./models/user');
import Post from './models/post'; // Assuming post model is default export

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

const storage = multer.memoryStorage();  // Store the files in memory (Buffer)
const upload = multer({ storage: storage });

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
    return res.status(500).json({ message: "Internal server error." + Post, error: error.message });
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

app.post("/submitpost", upload.array('images'), async (req: Request, res: Response): Promise<any> => {
  // Destructure the fields from the request body
  const { postTitle, postContent, tags } = req.body;

  // Validate that required fields are present
  if (!postTitle || !postContent || !tags) {
    return res.status(400).json({ message: 'Title, content, and tags are required.' });
  }

  // Get the files from the request (array of files)
  const files = req.files as Express.Multer.File[] || [];

  // Prepare the images to be saved in the database (allowing no images)
  const images = files.length > 0 
    ? files.map((file: Express.Multer.File) => ({
        data: file.buffer,    // file.buffer contains the file content
        contentType: file.mimetype,  // MIME type of the file
      })) 
    : [];  // If no files, assign an empty array


  try {
    // Placeholder user validation (to be replaced with actual authentication logic)
    const user = await User.findOne({});  // Replace with actual user lookup based on session/token
    if (!user) {
      return res.status(400).json({ message: "User not found or authentication required." });
    }

    // Create the new post and save it to the database
    const newPost = new Post({
      userId: user._id,  // Assuming user is logged in and their ID is available
      title: postTitle,
      body: postContent,
      images,
      tags: JSON.parse(tags),  // Store tags as an array of strings
    });

    await newPost.save();
    return res.status(201).json({ message: 'Post created successfully' });
  } catch (error: any) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});

app.get("/retrieveposts", async (req, res) => {
  try {
    const data = await Post.find({}).limit(10).exec();
    console.log(data);
    res.json(data)
  }
  catch (error: any) {
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});