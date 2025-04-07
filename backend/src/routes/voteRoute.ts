import express, { Request, Response, Router } from "express";

import User from "../models/user";
import Post from "../models/post";
import Vote, { IVote } from "../models/votes";
import { IsLoggedIn } from "../middleware/authorizedOnly";
import { Document } from "mongoose";

const router: Router = express.Router();

// updates or creates an upvote
router.post("/upvote/:id", IsLoggedIn, async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    const post = await Post.findOne({ publicId: id });

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    const user = await User.findOne({ _id: req.session.userId });
    if (!user) {
      return res.status(400).json({ message: "User not found or authentication required." });
    }

    const vote = await Vote.findOne({ publicId: id, userId: user._id });

    if (!vote) {
      const newVote = new Vote({
        userId: user._id,
        publicId: id,
        type: true,
      });
      await newVote.save();

      post.likes += 1;
      await post.save();

      return res.status(200).json({ message: "Upvote successful.", likes: post.likes, dislike: post.dislikes  });

    } else if (vote.type === true) {

      if (req.session.userId !== vote.userId.toString()) {
        return res.status(401).json({ message: "Unauthorized action. Delete your own vote???" });
      }

      await vote.deleteOne();

      post.likes -= 1;
      await post.save();

      return res.status(200).json({ message: "Upvote removed.", likes: post.likes, dislike: post.dislikes  });
    } else if (vote.type === false) {

      if (req.session.userId !== vote.userId.toString()) {
        return res.status(401).json({ message: "Unauthorized action. Delete your own vote???" });
      }

      vote.type = true;
      await vote.save();

      post.likes += 1;
      post.dislikes -= 1;
      await post.save();

      return res.status(200).json({ message: "Upvote successful previously downvote.", likes: post.likes, dislike: post.dislikes  });
    }

  } catch (error: any) {
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
 }
);

// updates or creates an downvote
router.post("/downvote/:id", IsLoggedIn, async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ publicId: id });

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    const user = await User.findOne({ _id: req.session.userId });
    if (!user) {
      return res.status(400).json({ message: "User not found or authentication required." });
    }

    const vote = await Vote.findOne({ publicId: id, userId: user._id });

    if (!vote) {
      const newVote = new Vote({
        userId: user._id,
        publicId: id,
        type: false,
      });
      await newVote.save();

      post.dislikes += 1;
      await post.save();

      return res.status(200).json({ message: "Downvote successful.", likes: post.likes, dislike: post.dislikes });
    } else if (vote.type === false) {

      if (req.session.userId !== vote.userId.toString()) {
        return res.status(401).json({ message: "Unauthorized action. Delete your own vote???" });
      }

      await vote.deleteOne();

      post.dislikes -= 1;
      await post.save();

      return res.status(200).json({ message: "Downvote removed.", likes: post.likes, dislike: post.dislikes  });

    } else if (vote.type === true) {

      if (req.session.userId !== vote.userId.toString()) {
        return res.status(401).json({ message: "Unauthorized action. Delete your own vote???" });
      }

      vote.type = false;
      await vote.save();

      post.dislikes += 1;
      post.likes -= 1;
      await post.save();
      return res.status(200).json({ message: "Downvote successful previously upvote.", likes: post.likes, dislike: post.dislikes  });
    }

  } catch (error: any) {
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
 }
);

// sends vote status of a user with given post pIds
router.get("/retrievevote", async (req: Request, res: Response): Promise<any> => {
  try {
    const ids = req.query.ids;

    if (!ids) return res.status(400).json({ message: "No post IDs provided." });

    const postIds: string[] = typeof ids === "string" ? ids.split(",") : [];

    const posts = await Post.find({ publicId: { $in: postIds } });

    if (!posts.length) return res.status(404).json({ message: "Posts not found." });

    const user = await User.findOne({ _id: req.session.userId });

    return res.status(200).json(
      await Promise.all(posts.map(async (post) => {
        let vote = null;

        if (user) {
          vote = await Vote.findOne({ publicId: post.publicId, userId: user._id });
        }

        return {
          publicId: post.publicId,
          initialLikes: post.likes,
          initialDislikes: post.dislikes,
          initialVote: vote?.type,
        };
      }))
    );
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
