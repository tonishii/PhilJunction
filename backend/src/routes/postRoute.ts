import express, { Request, Response, Router } from "express";
import multer from 'multer';

import Post, { IPost } from "../models/post";
import Comment from "../models/comment";
import Vote from "../models/votes";
import { IsLoggedIn } from "../middleware/authorizedOnly";
import User from "../models/user";

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

router.post("/submitpost", IsLoggedIn, upload.array('images'), async (req: Request, res: Response): Promise<any> => {
  const { postTitle, postContent, tags, origin, destination } = req.body;

  if (!postTitle || !postContent || JSON.parse(tags).length === 0) {
    return res.status(400).json({ message: 'Title, content, and tags are required.' });
  }

  const files = req.files as Express.Multer.File[] || [];

  const images = files.length > 0 ?
    files.map((file: Express.Multer.File) => ({
      data: file.buffer,
      contentType: file.mimetype,
    })) : [];

  try {
    const { userId, username } = req.session;

    const newPost: IPost = new Post({
      userId,                       // Assuming user is logged in and their ID is available
      username,
      title: postTitle,
      body: postContent,
      images: images,
      tags: JSON.parse(tags),
      publicId: createId(10),
    });

    if (origin && destination) {  // only add if both exist
      newPost.origin = JSON.parse(origin);
      newPost.destination = JSON.parse(destination);
    }

    await newPost.save();
    return res.status(201).json({ message: 'Post created successfully.' });
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});

// on load front page
router.get("/retrieveposts", async (req: Request, res: Response) => {
  try {
    const data = await Post.find({}).sort({ postDate: -1 }).limit(5).exec();
    // const user = data.forEach(async (post) => {
    //   return await User.findOne({ _id: post.userId });
    // });

    // res.json({ data: data, user: user });
    const postsWithImages = await Promise.all(
      data.map(async (post) => {
        const images = post.images?.map((image) => ({
          contentType: image.contentType,
          imageUrl: `data:${image.contentType};base64,${image.data.toString('base64')}`,
        }));


        return {
          post: { ...post.toObject(), images: images || [] },
          commentCount: await Comment.countDocuments({ publicId: post.publicId }),
        };
      })
    );

    res.json(postsWithImages);
  }
  catch (error: any) {
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});

// infinite scroll
router.get("/retrievemoreposts", async (req: Request, res: Response) => {
  try {
    let currLen = Number(req.query.curr_len)
    let count = await Post.countDocuments();
    let lim = count - currLen > 5 ? 5 : count - currLen;
    // console.log(currLen, count, lim);

    const data = await Post.find({})
      .sort({ postDate: -1 })
      .skip(currLen)
      .limit(lim)
      .exec();

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

    const newLen = lim + currLen;
    // console.log(newLen, count, count > newLen);

    res.json({ posts: postsWithImages, more: count > newLen});
  } catch (error: any) {
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


// sends post for post window page
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
      post: { ...data.toObject(), images: images || [] },
      commentCount: await Comment.countDocuments({ publicId: data.publicId }),
    });

  } catch (e: unknown) {
    console.log("[ERROR] Error during post retrieval:", e);
    res.status(500).json({ message: "Internal server error." });
  }
})

router.post("/updatepost", IsLoggedIn, upload.array('images'), async (req: Request, res: Response): Promise<any> => {
  const { publicId, postTitle, postContent, tags, origin, destination } = req.body;
  const userId = req.session.userId;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(400).json({ message: "User not found or authentication required." });
    }

    const post = await Post.findOne({ publicId });
    if (!post) {
      res.status(404).json({ message: "Post not found." });
      return;
    }

    // Make sure that the user was the one that actually posted this
    if (post.userId.toString() !== userId) {
      res.status(403).json({ message: "Unauthorized deletion. Not ur damn post!" });
      return
    }

    if (!publicId || !postTitle || !postContent || tags.length === 0) {
      return res.status(400).json({ message: 'Title, content, public ID, and tags are required.' });
    }

    const files = req.files as Express.Multer.File[] || [];

    const images = files.length > 0 ?
      files.map((file: Express.Multer.File) => ({
        data: file.buffer,
        contentType: file.mimetype,
      })) : [];

    await Post.updateOne(
      { publicId: publicId },
      {
        $set: {
          title: postTitle,
          body: postContent,
          images: images,
          tags: JSON.parse(tags),
          origin: JSON.parse(origin),
          destination: JSON.parse(destination),
        },
      }
    );

    return res.status(201).json({ message: "Post updated successfully." });
  } catch (error: any) {
    return res.status(500).json({ message: error });
  }
});

router.post("/deletepost/:publicId", IsLoggedIn, async (req: Request, res: Response): Promise<any> => {
  const { publicId } = req.params;

  try {
    const post = await Post.findOne({ publicId: publicId });

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (post.userId.toString() !== req.session.userId) {
<<<<<<< HEAD
      return res.status(403).json({ message: "Unauthorized deletion. How bout u delete ur own post?" });
=======
      return res.status(401).json({ message: "Unauthorized deletion. How bout u delete ur own post?" });
>>>>>>> 2e700165f3855a89c9d1c88b3aee2da9d1524584
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

  // console.log(keywords, parsed, numericalFilter);
  // console.log(Date.now() - numericalFilter)
  try {
    let data: IPost[] = [];
    const regex = new RegExp(keywords as string, 'i')
    if (keywords && parsed.length > 0) {
      data = await Post.find({ $or: [{ title: { $regex: regex } }, { description: { $regex: regex } }], tags: { $in: parsed }, postDate: { $gt: new Date((new Date).getDate() - numericalFilter) } }).exec();
    }
    else if (keywords) {
      data = await Post.find({ $or: [{ title: { $regex: regex } }, { description: { $regex: regex } }], postDate: { $gt: new Date((new Date).getDate() - numericalFilter) } }).sort({ postDate: -1 }).exec();
    }
    else if (parsed.length > 0) {
      data = await Post.find({ tags: { $in: parsed }, postDate: { $gt: new Date((new Date).getDate() - numericalFilter) } }).exec();
    }

    const posts = data.map((post) => {
      const images = post.images.map((image) => ({
        contentType: image.contentType,
        imageUrl: `data:${image.contentType};base64,${image.data.toString('base64')}`,
      }));

      return { ...post.toObject(), images: images || [] }
    });

    const postIds = posts.map(post => post.publicId);

    const commentCounts = await Comment.aggregate([
      { $match: { publicId: { $in: postIds } } },
      { $group: { _id: "$publicId", count: { $sum: 1 } } }
    ]);

    const countMap = Object.fromEntries(commentCounts.map(c => [c._id, c.count]));

    res.json({
      posts: posts,
      commentCounts: posts.map(post => ({
        publicId: post.publicId,
        count: countMap[post.publicId] || 0
      }))
    });
  }
  catch (error: any) {
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});

export default router;
