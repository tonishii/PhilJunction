import express, { Request, Response, Router } from "express";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import User from "../models/user";
import Post from "../models/post";
import Comment from "../models/comment";

const router: Router = express.Router();

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

        const icon = {
            contentType: user.icon.contentType,
            imageUrl: `data:${user.icon.contentType};base64,${user.icon.data.toString('base64')}`
        };

        return res.status(200).json({ message: "User data successfully pulled", user: { ...user.toObject(), icon: icon } });
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
            return res.status(200).json({ message: "No posts yet. ", posts: [] });
        }
        console.log(posts);
        return res.status(200).json({ message: "Posts of user successfully pulled.", posts: posts });
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
            return res.status(200).json({ message: "No comments yet.", comments: [] });
        }

        return res.status(200).json({ message: "Comments of user successfully pulled.", comments: comments });
    } catch (err) {
        res.status(500).json({ message: "Server error:", err });
    }
});

router.post("/updateuser", upload.single("icon"), async (req: Request, res: Response): Promise<any> => {
    try {
        const { oldusername, username, email, bio } = req.body;

        const newIcon = req.file ? {
            contentType: req.file.mimetype,
            data: req.file.buffer
        } : undefined;

        const updateFields: any = { username, email, description: bio };
        if (newIcon) updateFields.icon = newIcon;

        const result = await User.findOneAndUpdate(
            { username: oldusername },
            { $set: updateFields },
            { new: true, runValidators: true },
        );

        if (!result) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.status(200).json({ message: "User updated successfully", user: result });
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

export default router;