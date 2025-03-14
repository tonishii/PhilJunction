import { Request, Response } from "express";

import express from 'express';
import multer from 'multer';

import User from "../models/user";
import Comment from "../models/comment";
import Post, { IPost } from "../models/post";

const router = express.Router();
const storage = multer.memoryStorage();  // Store the files in memory (Buffer)
const upload = multer({ storage: storage });

function createId(length: number): string {
  const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let newId = "";
  for (let i = 0; i < length; i++) {
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
      username: user.username,
      title: postTitle,
      body: postContent,
      images,
      tags: JSON.parse(tags),  // Store tags as an array of strings
      publicId: createId(10)
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

router.get("/retrievepost/:id", async (req: Request, res: Response) => {
  try {
    const data = await Post.findOne({ publicId: req.params.id });
    if (!data) {
      res.status(404).json({ message: "Post not found." });
      return;
    }

    res.status(200).json(data);
    return;
  } catch (e: unknown) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
})

router.get("/retrievecomment/:id", async (req: Request, res: Response) => {
  try {
    const data = await Comment.findOne({ _id: req.params.id });
    if (!data) {
      res.status(404).json({ message: "Comment not found." });
      return;
    }

    res.status(200).json(data);
  } catch (e: unknown) {
    console.log(e);
    res.status(500).json({ message: "server error" });
  }
})

router.post("/submitcomment", async (req, res): Promise<any> => {
  try {
    const { username, body, postId, topLevel, replyTo } = req.body;
    console.log(username, body, postId, topLevel, replyTo)

    if (!body || !replyTo) {
      return res.status(400).json({ message: "Body and replied to are required. " })
    }

    const user = await User.findOne({ username: replyTo });

    if (!user) {
      return res.status(404).json({ message: "User not found or authentication required." });
    }

    const relatedPost = Post.findOne({ publicId: postId });

    if (!relatedPost) {
      return res.status(404).json({ message: "Post not found." });
    }

    const newComment = new Comment({
      userId: user._id,
      username: username,
      body: body,
      replyTo: replyTo,
      replies: [],
      topLevel: topLevel
    });

    const savedComment = await newComment.save();
    console.log("hi")
    await relatedPost.updateOne({ $push: { comments: savedComment._id } });

    return res.status(201).json({ message: "Comment created successfully.", comment: savedComment });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error.", error: err.message });
  }
}
)

router.post("/searchposts", async (req, res) => {
  const { keywords, tags, filterBy } = req.body;
  const parsed = JSON.parse(tags)
  console.log(Date.now() - filterBy)
  try {
    let data: IPost[] = [];
    const regex = new RegExp(keywords, 'i')
    if (keywords && parsed.length > 0) {
      data = await Post.find({ $or: [{ title: { $regex: regex } }, { description: { $regex: regex } }], tags: JSON.parse(tags), postDate: { $gt: new Date((new Date).getDate() - filterBy) } }).exec();
    }
    else if (keywords) {
      data = await Post.find({ $or: [{ title: { $regex: regex } }, { description: { $regex: regex } }], postDate: { $gt: new Date((new Date).getDate() - filterBy) } }).sort({ postDate: -1 }).exec();
    }
    else if (parsed.length > 0) {
      data = await Post.find({ tags: JSON.parse(tags), postDate: { $gt: new Date((new Date).getDate() - filterBy) } }).exec();
    }
    console.log(data);
    res.json(data);
  }
  catch (error: any) {
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});

export default router;