import express, { Request, Response, Router } from "express";
import multer from 'multer';

import User from "../models/user";
import Post, { IPost } from "../models/post";
import Comment from "../models/comment";
import Vote from "../models/votes";

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
    const user = await User.findOne({ username: "ANTHIMON" });  // Replace with actual user lookup based on session/token
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
    const data = await Post.find({}).sort({ postDate: -1 }).limit(10).exec();
    // const user = data.forEach(async (post) => {
    //   return await User.findOne({ _id: post.userId });
    // });

    // res.json({ data: data, user: user });
    const postsWithImages = data.map((post) => {
      const images = post.images?.map((image) => ({
        contentType: image.contentType,
        imageUrl: `data:${image.contentType};base64,${image.data.toString('base64')}`,
      }));

      return {
        ...post.toObject(),
        images: images || [],
      };
    });

    res.json(postsWithImages);
  }
  catch (error: any) {
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});

router.get("/retrievemoreposts", async (req: Request, res: Response) => {
  try {
    let currLen = Number(req.query.curr_len)
    let count = await Post.countDocuments();
    let lim = count - currLen > 10 ? 10 : count - currLen;

    console.log(req.query.curr_len, currLen, count, lim)
    const data = await Post.find({}).sort({ postDate: -1 }).skip(currLen).limit(lim).exec();

    const postsWithImages = data.map((post) => {
      const images = post.images?.map((image) => ({
        contentType: image.contentType,
        imageUrl: `data:${image.contentType};base64,${image.data.toString('base64')}`,
      }));

      return {
        ...post.toObject(),
        images: images || [],
      };
    });

    res.json(postsWithImages);
  }
  catch (error: any) {
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});

router.get("/trendingposts", async (req: Request, res: Response) => {
  try {
    const data = await Post.find({}).sort({ likes: -1, dislikes: 1 }).limit(5).exec();
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

    const images = data.images.map((image) => ({
      contentType: image.contentType,
      imageUrl: `data:${image.contentType};base64,${image.data.toString('base64')}`,
    }));

    return res.status(200).json({
      message: "Post successfully pulled",
      post: { ...data.toObject(), images: images || [] }
    });
  } catch (e: unknown) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
})

router.post("/updatepost", upload.array('images'), async (req: Request, res: Response): Promise<any> => {
  const { publicId, postTitle, postContent, tags } = req.body;
  console.log(tags);

  if (!publicId || !postTitle || !postContent || !tags) {
    return res.status(400).json({ message: 'Title, content, public ID, and tags are required.' });
  }

  const files = req.files as Express.Multer.File[] || [];

  const images = files.length > 0 ?
    files.map((file: Express.Multer.File) => ({
      data: file.buffer,
      contentType: file.mimetype,
    })) : [];

  try {
    const user = await User.findOne({});  // Replace with actual user

    if (!user) {
      return res.status(400).json({ message: "User not found or authentication required." });
    }

    // Make sure that the user was the one that actually posted this
    await Post.updateOne(
      { publicId: publicId },
      {
        $set: {
          title: postTitle,
          body: postContent,
          images: images,
          tags: JSON.parse(tags),
        },
      }
    );

    return res.status(201).json({ message: "Post updated successfully." });
  } catch (error: any) {
    return res.status(500).json({ message: error });
  }
});

router.post("/deletepost/:publicId", async (req: Request, res: Response): Promise<any> => {
  const { publicId } = req.params;

  try {
    const post = await Post.findOne({ publicId: publicId });

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    await Comment.deleteMany({ publicId: publicId });
    await Vote.deleteMany({ publicId: publicId });
    await Post.deleteOne({ publicId: publicId });

    return res.status(200).json({ message: "Post and related data deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.get("/searchposts", async (req: Request, res: Response) => {
  const { keywords, tags, filterBy } = req.query;
  const parsed = JSON.parse(tags as string ?? "[]");
  const numericalFilter = Number(filterBy) ?? 1;
  console.log(Date.now() - numericalFilter)
  try {
    let data: IPost[] = [];
    const regex = new RegExp(keywords as string, 'i')
    if (keywords && parsed.length > 0) {
      data = await Post.find({ $or: [{ title: { $regex: regex } }, { description: { $regex: regex } }], tags: parsed, postDate: { $gt: new Date((new Date).getDate() - numericalFilter) } }).exec();
    }
    else if (keywords) {
      data = await Post.find({ $or: [{ title: { $regex: regex } }, { description: { $regex: regex } }], postDate: { $gt: new Date((new Date).getDate() - numericalFilter) } }).sort({ postDate: -1 }).exec();
    }
    else if (parsed.length > 0) {
      data = await Post.find({ tags: parsed, postDate: { $gt: new Date((new Date).getDate() - numericalFilter) } }).exec();
    }
    console.log(data);
    res.json(data);
  }
  catch (error: any) {
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});

export default router;