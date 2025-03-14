import { Request, Response } from "express";

const express = require('express');
import User from "../models/user";
import Post from "../models/post";
import Comment from "../models/comment";
import { error } from "console";

const router = express.Router();

router.get('/randomuser', async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({});
        res.status(200).json({ username: user?.username });
    } catch (eerrr) {
        console.log(eerrr);
        res.status(404).json({ message: "ha" });
    }
})

router.get('/user/:username', async (req: Request, res: Response): Promise<any> => {
    try {
        const user = await User.findOne({ username: req.params.username });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error:", err });
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
            return res.status(404).json({ message: "No posts yet. " });
        }

        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: "Server error:", err });
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
            return res.status(404).json({ message: "No comments yet. " });
        }

        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: "Server error:", err });
    }
});

/* Allow users to update their username, email, and bio, you need to add an update user route. */
router.post("/updateuser", async (req: Request, res: Response): Promise<any> => {
    try {
        const { oldusername, username, email, bio } = req.body; // Extract fields from request body

        const result = await User.findOneAndUpdate(
            { username: oldusername},
            { $set: {username: username, email: email, bio: bio} }, // Update fields
            { new: true, runValidators: true } // Return updated user & apply validation
        );

        if (!result) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.status(200).json({ message: "User updated successfully", user: result });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
});

export default router;