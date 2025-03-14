import { Request, Response } from "express";

import express, { Router } from 'express';
import User from "../models/user";
import Comment from "../models/comment";

const router: Router = express.Router();

router.post("/submitcomment", async (req: Request, res: Response): Promise<any> => {
    try {
        const { username, body, replyTo } = req.body;

        if (!body || !replyTo ) {
            return res.status(400).json({ message: "Body and replied to are required. "})
        }

        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(404).json({ message: "User not found or authentication required." });
        }

        const newComment = new Comment({
            userId: user._id,
            username: username,
            body: body,
            replyTo: replyTo,
            replies: [],
        });

        const savedComment = await newComment.save();
        return res.status(201).json({ message: "Comment created successfully.", comment: savedComment });
    } catch (err: any) {
        return res.status(500).json({ message: "Internal server error.", error: err.message });
    }
});

router.post("/editcomment", async (req, res): Promise<any> => {
    const { commentID, body } = req.body;

    const comment = await Comment.findOne({ _id: commentID });

    if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
    }

    comment.body = body;
    res.status(200).json({ comment: comment });
})

router.post("/deletecomment", async (req, res): Promise<any> => {
    const { commentID } = req.body;

    try {
        const result = await Comment.findOneAndDelete({_id: commentID});
        if (!result) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.status(200).json({ message: "Comment deleted successfully", deletedComment: result });
    } catch (error) {
        console.error("Error occurred while deleting comment:", error);
        res.status(500).json({ message: "Error occurred while deleting comment" });
    }
})
export default router;