import { Request, Response } from "express";

import express from 'express';
import multer from 'multer';

import User from "../models/user";
import Post from "../models/post";
import Comment from "../models/comment";

const router = express.Router();
const storage = multer.memoryStorage();  // Store the files in memory (Buffer)
const upload = multer({ storage: storage });

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
      username: user.username,
      title: postTitle,
      body: postContent,
      images,
      tags: JSON.parse(tags),  // Store tags as an array of strings
    });

    await newPost.save();
    return res.status(201).json({ message: 'Post created successfully.' });
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});

router.get("/retrieveposts", async (req, res) => {
  try {
    const data = await Post.find({}).limit(10).exec();
    // const user = data.forEach(async (post) => {
    //   return await User.findOne({ _id: post.userId });
    // });

    // res.json({ data: data, user: user });
    res.json(data);
  }
  catch (error: any) {
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});

export default router;