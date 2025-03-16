import express, { Request, Response, Router} from "express";

import User from "../models/user";
import Comment, { IComment } from "../models/comment";
import mongoose from "mongoose";

const router: Router = express.Router();

router.post("/submitcomment", async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, body, publicId, parentId, type } = req.body;

    if (!body || !parentId || !publicId || !type) {
      return res.status(400).json({ message: "Body, post, type, and parent comment are required."})
    }

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const newComment = new Comment({
      username: username,
      userId: user._id,
      body: body,
      publicId: publicId,
      parentId: parentId,
      replies: [],
    });

    const savedComment: IComment = await newComment.save();
    if (type === "Reply") {
      const parentComment = await Comment.findOne({ _id: parentId });

      if (!parentComment) {
        return res.status(404).json({ message: "Parent comment not found."});
      }

      parentComment.replies.push(savedComment._id as mongoose.Types.ObjectId);
      await parentComment.save();

      return res.status(201).json({ message: "Reply created successfully.", newReply: savedComment });
    }

    return res.status(201).json({ message: "Comment created successfully.", newComment: savedComment });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
});

router.post("/editcomment", async (req: Request, res: Response): Promise<any> => {
  const { commentId, body } = req.body;

  const comment = await Comment.findOne({ _id: commentId });

  if (!comment) {
    return res.status(404).json({ message: "Comment not found." });
  }

  comment.body = body;
  await comment.save();
  return res.status(200).json({ message: "Comment successfully edited.", comment: comment });
})

router.post("/deletecomment", async (req: Request, res: Response): Promise<any> => {
  const { commentId } = req.body;

  try {
    const comment = await Comment.findOne({_id: commentId});

    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    comment.replies.forEach(async (replyId) => {
      const reply = Comment.findOne({ _id: replyId });
      await reply.deleteOne();
    });

    await comment.deleteOne();
    return res.status(200).json({ message: "Comment deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: error });
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
});

export default router;