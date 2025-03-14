import { Request, Response } from "express";

const express = require('express');
import User from "../models/user";
import Post from "../models/post";
import Comment from "../models/comment";

const router = express.Router();

router.get('/user/:username', async (req: Request, res: Response): Promise<any> => {
    try {
        const user = await User.findOne({ username: req.params.username });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.status(200).json(user);
    } catch(err) {
        res.status(500).json({ message: "Server error:", err});
    }
});

router.get('/user/:username/posts', async (req: Request, res: Response): Promise<any> => {
    try {
        const user = await User.findOne({ username: req.params.username });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const posts = await Post.find({ userId: user._id });

        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: "No posts yet. "});
        }

        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: "Server error:", err});
    }
});

router.get('/user/:username/comments', async (req: Request, res: Response): Promise<any> => {
    try {
        const user = await User.findOne({ username: req.params.username });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const comments = await Comment.find({ userId: user._id });

        if (!comments || comments.length === 0) {
            return res.status(404).json({ message: "No comments yet. "});
        }

        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: "Server error:", err});
    }
});

export default router;