import express, { Request, Response, Router } from "express";
import multer from 'multer';

import User from "../models/user";
import Post, { IPost } from "../models/post";

const router: Router = express.Router();
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
  const { postTitle, postContent, tags } = req.body;

  if (!postTitle || !postContent || !tags) {
    return res.status(400).json({ message: 'Title, content, and tags are required.' });
  }

  const files = req.files as Express.Multer.File[] || [];

  const images = files.length > 0 ?
    files.map((file: Express.Multer.File) => ({
      data: file.buffer,
      contentType: file.mimetype,
    })) : [];

  try {
    // Placeholder user validation (to be replaced with actual authentication logic)
    const user = await User.findOne({});  // Replace with actual user lookup based on session/token
    if (!user) {
      return res.status(400).json({ message: "User not found or authentication required." });
    }

    const newPost = new Post({
      userId: user._id,  // Assuming user is logged in and their ID is available
      username: user.username,
      title: postTitle,
      body: postContent,
      images: images,
      tags: JSON.parse(tags),
      publicId: createId(10)
    });

    await newPost.save();
    return res.status(201).json({ message: 'Post created successfully.' });
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});

router.get("/retrieveposts", async (req: Request, res: Response) => {
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

router.get("/trendingposts", async (req: Request, res: Response) => {
  try {
    const data = await Post.find({}).sort({likes: -1, dislikes: 1}).limit(5).exec();
    res.json(data)
  }
  catch (error: any) {
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});

router.get("/retrievepost/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const data = await Post.findOne({ publicId: req.params.id });
    if (!data) {
      return res.status(404).json({ message: "Post not found." });
    }

    return res.status(200).json({ message: "Post successfully pulled", post: data });
  } catch (e: unknown) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
})

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