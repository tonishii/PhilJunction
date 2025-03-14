import { Request, Response } from "express";

import express from 'express';
import multer from 'multer';

import User from "../models/user";
import Post from "../models/post";

const router = express.Router();
const storage = multer.memoryStorage();  // Store the files in memory (Buffer)
const upload = multer({ storage: storage });

function createPostId(): string {
  const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let newId = "";
  for (let i = 0; i < 10; i++) {
    newId += alphabet.charAt(Math.floor(alphabet.length * Math.random()));
  }
  return newId;
}

router.post("/submitpost", upload.array('images'), async (req: Request, res: Response): Promise<any> => {
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
      publicId: createPostId()
    });

    await newPost.save();
    return res.status(201).json({ message: 'Post created successfully' });
  } catch (error: any) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});

router.get("/retrieveposts", async (req, res) => {
  try {
    const data = await Post.find({}).limit(10).exec();
    console.log(data);
    res.json(data)
  }
  catch (error: any) {
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});

export default router;