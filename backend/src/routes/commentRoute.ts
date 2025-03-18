import express, { Request, Response, Router} from "express";

import User from "../models/user";
import Comment, { IComment } from "../models/comment";
import mongoose from "mongoose";
import Post from "../models/post";

const router: Router = express.Router();

router.post("/submitcomment", async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, body, publicId, parentId, type } = req.body;

    if (!body || !publicId || !type || (type === "Reply" && !parentId)) {
      return res.status(400).json({ message: "Body, post, type, and parent comment are required."})
    }

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (type === "Reply") {
      const parentComment = await Comment.findOne({ _id: parentId });

      if (!parentComment) {
        return res.status(404).json({ message: "Parent comment not found."});
      }

      const newComment = new Comment({
        username: username,
        userId: user._id,
        body: body,
        publicId: publicId,
        parentId: parentComment._id,
        replies: [],
      });

      const savedComment: IComment = await newComment.save();

      parentComment.replies.push(savedComment._id as mongoose.Types.ObjectId);
      await parentComment.save();

      return res.status(201).json({ message: "Reply created successfully.",
        newReply: {
          commentID: savedComment._id,
          username: savedComment.username,
          body: savedComment.body,
          postDate: savedComment.createdAt,
          publicId: savedComment.publicId,
          parentId: savedComment.parentId,
          replies: savedComment.replies,
        }});
    } else if (type === "Comment") {
      const parentPost = await Post.findOne({ publicId: parentId });

      if (!parentPost) {
        return res.status(404).json({ message: "Parent post not found."});
      }

      const newComment = new Comment({
        username: username,
        userId: user._id,
        body: body,
        publicId: publicId,
        replies: [],
      });

      const savedComment: IComment = await newComment.save();

      parentPost.comments.push(savedComment._id as mongoose.Types.ObjectId);
      await parentPost.save();

      return res.status(201).json({ message: "Comment created successfully",
        newComment: {
          commentID: savedComment._id,
          username: savedComment.username,
          body: savedComment.body,
          postDate: savedComment.createdAt,
          publicId: savedComment.publicId,
          parentId: savedComment.parentId,
          replies: savedComment.replies,
        }
      });
    }
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
});

router.post("/editcomment/:id", async (req: Request, res: Response): Promise<any> => {
  const { body } = req.body;

  const comment = await Comment.findOne({ _id: req.params.id });

  if (!comment) {
    return res.status(404).json({ message: "Comment not found." });
  }

  comment.body = body;
  await comment.save();
  return res.status(200).json({
    message: "Comment successfully edited.",
    comment: {
      commentID: comment._id,
      username: comment.username,
      body: comment.body,
      postDate: comment.createdAt,
      publicId: comment.publicId,
      parentId: comment.parentId,
      replies: comment.replies,
    }
  });
})

router.post("/deletecomment/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const comment = await Comment.findOne({_id: req.params.id});

    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    await Promise.all(comment.replies.map(async (replyId) => {
      await Comment.deleteOne({ _id: replyId });
    }));

    if (comment.parentId !== null) {
      await Comment.updateOne(
        { _id: comment.parentId },
        { $pull: { replies: comment._id } }
      );
    } else {
      await Post.updateOne(
        { publicId: comment.publicId },
        { $pull: { comments: comment._id }}
      );
    }

    await comment.deleteOne();
    return res.status(200).json({ message: "Comment deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
})

router.get("/retrievecomment/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const data = await Comment.findOne({ _id: req.params.id });

    if (!data) {
      return res.status(404).json({ message: "Comment not found." });
    }

    return res.status(200).json({ message: "Comment successfully pulled.",
      comment: {
        commentID: data._id,
        username: data.username,
        body: data.body,
        postDate: data.createdAt,
        publicId: data.publicId,
        parentId: data.parentId,
        replies: data.replies,
      }});
  } catch (err: unknown) {
    return res.status(500).json({ message: err });
  }
});

export default router;