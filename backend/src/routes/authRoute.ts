import express, { Request, Response, Router } from "express";

import User from "../models/user";
import { comparePassword, hashPassword } from "../utils/hash";

const router: Router = express.Router();

router.post("/register", async (req: Request, res: Response): Promise<any> => {
  const { username, email, password, confirmPW } = req.body;

  if (!username || !email || !password || !confirmPW)
    return res.status(400).json({ message: req.body });

  if (password !== confirmPW)
    return res.status(400).json({message: 'Passwords do not match.'});

  try {
    const user = await User.findOne({ $or: [{ username }, { email }] }).exec();

    if (user)
      return res.status(400).json({message: 'Account already exists.'});

    await User.create({
      username: username,
      email: email,
      password: await hashPassword(password),
    });

    return res.status(201).json({ message: 'User registered successfully'});
  }
  catch (error: any) {
    console.error("Error during registration:", error);
    return res.status(500).json({ messsage: error });
  }
});

router.post("/login", async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).exec();

    if (!user) {
      return res.status(400).json({message: 'Account does not exist.'});
    }

    if (await comparePassword(password, user.password)) {
      return res.status(201).json({ message: 'User logged in successfully.'});
    } else {
      return res.status(401).json({ message: "Wrong password entered." });
    }

  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});

export default router;