import express, { Request, Response, Router } from "express";

import User from "../models/user";
import Post from "../models/post";
import Vote from "../models/votes";
import { IsLoggedIn } from "../middlewares/authorizedOnly";

const router: Router = express.Router();

// VOTES
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
      await vote.deleteOne();

      post.likes -= 1;
      await post.save();

      return res.status(200).json({ message: "Upvote removed.", likes: post.likes, dislike: post.dislikes  });
    } else if (vote.type === false) {
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
      await vote.deleteOne();

      post.dislikes -= 1;
      await post.save();

      return res.status(200).json({ message: "Downvote removed.", likes: post.likes, dislike: post.dislikes  });
    } else if (vote.type === true) {
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

router.get("/retrievevote", async (req: Request, res: Response): Promise<any> => {
  try {
    const ids = req.query.ids;

    if (!ids) return res.status(400).json({ message: "No post IDs provided." });

    const postIds: string[] = typeof ids === "string" ? ids.split(",") : [];

    const posts = await Post.find({ publicId: { $in: postIds } });

    if (!posts.length) return res.status(404).json({ message: "Posts not found." });

    const user = await User.findOne({ _id: req.session.userId });
    let votes;
    if (!user) {
      votes = {};
    } else {
      votes = await Vote.find({ publicId: { $in: postIds }, userId: user._id });
    }

    return res.status(200).json(
      posts.map(post => ({
        publicId: post.publicId,
        initialLikes: post.likes,
        initialDislikes: post.dislikes,
        initialVote: votes,
      }))
    );
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
