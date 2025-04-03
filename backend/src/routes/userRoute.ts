import express, { Request, Response, Router } from "express";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import User from "../models/user";
import Post from "../models/post";
import Comment from "../models/comment";
import { IsLoggedIn } from "../middleware/authorizedOnly";

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
        // console.log(user, req.params.username)
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const icon = {
            contentType: user.icon.contentType,
            imageUrl: `data:${user.icon.contentType};base64,${user.icon.data.toString('base64')}`
        };
        const userId = req.session.userId;
        // console.log(req.session);

        // checking if logged in.
        if (userId === undefined || userId === null) {
            return res.status(200).json({ message: "User data successfully pulled", user: { ...user.toObject(), icon: icon }, logOut: true });
        }
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
        // console.log(posts);
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

router.post("/updateuser", IsLoggedIn, upload.single("icon"), async (req: Request, res: Response): Promise<any> => {
    try {
        const { oldusername, username, email, bio } = req.body;

        if (oldusername != req.session.username) {
            return res.status(403).json({ message: "Unauthorized action. This is not your account..." });
        }
        if (!(email as string).match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)) {
            res.status(400).json({ message: 'Must be an email!' });
            return;
        }

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
        const icon = {
            contentType: result.icon.contentType,
            imageUrl: `data:${result.icon.contentType};base64,${result.icon.data.toString('base64')}`
        };

        return res.status(200).json({ message: "User updated successfully", user: { ...result.toObject(), icon: icon } });
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

export default router;
