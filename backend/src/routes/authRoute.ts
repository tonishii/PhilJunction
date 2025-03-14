import { Request, Response } from "express";

import express from 'express';
import multer from 'multer';

import User from "../models/user";
import Post from "../models/post";

const router = express.Router();
const storage = multer.memoryStorage();  // Store the files in memory (Buffer)

router.post("/register", async (req: Request, res: Response): Promise<any> => {
  const { username, email, password, confirmPW } = req.body;

  if (!username || !email || !password || !confirmPW)
    return res.status(400).json({ message: req.body });

  if(password !== confirmPW)
    return res.status(400).json({message: 'Passwords do not match.'});

  try {
    const user = await User.findOne({ username, email, password }).exec();
    if(user)
      return res.status(400).json({message: 'Account already exists.'});

    await User.create({...req.body})
    return res.status(201).json({ message: 'User registered successfully'});
  }
  catch (error: any) {
    console.error("Error during registration:", error);
    console.log(error);
    return res.status(500).json({ message: "Internal server error." + Post, error: error.message });
  }
});

router.post("/login", async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    const user = await User.findOne({ username, password }).exec();
    if(user)
      return res.status(201).json({ message: 'User login successfully'});
    else
      return res.status(400).json({message: 'Account does not exist.'});
    }
  catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});

export default router;