import express, { Request, Response, Router } from "express";

import User from "../models/user";
import { comparePassword, hashPassword } from "../utils/hash";

const router: Router = express.Router();

router.post("/register", async (req: Request, res: Response): Promise<any> => {
  const { username, email, password, confirmPW } = req.body;

  if (!username || !email || !password || !confirmPW)
    return res.status(400).json({ message: req.body });

  if (password !== confirmPW)
    return res.status(400).json({ message: 'Passwords do not match.' });

  try {
    const user = await User.findOne({ $or: [{ username }, { email }] }).exec();

    if (user)
      return res.status(400).json({ message: 'Account already exists.' });

    const newUser = await User.create({
      username: username,
      email: email,
      password: await hashPassword(password),
    });
    req.session.isLoggedIn = true;
    req.session.username = newUser.username;
    req.session.userId = newUser.id;
    req.session.save();
    console.log("this guy just logged in", req.session, req.sessionID);
    return res.status(201).json({ message: 'User registered successfully' });
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
      return res.status(400).json({ message: 'Account does not exist.' });
    }

    if (await comparePassword(password, user.password)) {
      req.session.isLoggedIn = true;
      req.session.username = user.username;
      req.session.userId = user.id;
      req.session.save();
      console.log("this guy just logged in", req.session, req.sessionID);
      res.status(201).json({ message: 'User logged in successfully.' });
    } else {
      res.status(401).json({ message: "Wrong password entered." });
    }
    return;
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});

router.get("/checkLoggedIn", async (req: Request, res: Response) => {
  console.log("this person is checking if they are logged in:");
  console.log(req.session, req.sessionID, req.session.username);
  if (!req.session.isLoggedIn) {
    res.status(200).json({ isLoggedIn: false, username: null });
    return;
  } else {
    res.status(200).json({ isLoggedIn: true, username: req.session.username });
  }
})

router.post("/logout", async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (!err) {
      console.log("logged-out user.");
      res.status(200).json({ message: "Logged out successfully." });
      return;
    }

    console.log("could not log user out.");
    console.log(err);
    res.status(500).json({ message: "something happened." });
  });
})

export default router;