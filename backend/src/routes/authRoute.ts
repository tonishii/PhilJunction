import express, { Request, Response, Router } from "express";

import User from "../models/user";
import { comparePassword, hashPassword } from "../utils/hash";

const router: Router = express.Router();

router.post("/register", async (req: Request, res: Response): Promise<any> => {
  const { username, email, password, confirmPW } = req.body;

  if (!username || !email || !password || !confirmPW)
    return res.status(400).json({ message: req.body });

  if (password !== confirmPW)
    return res.status(400).json({ message: "Passwords do not match." });

  if (
    !(email as string).match(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    )
  ) {
    res.status(400).json({ message: "Must be an email!" });
    return;
  }

  try {
    const user = await User.findOne({ $or: [{ username }, { email }] }).exec();

    if (user)
      return res.status(400).json({ message: "Account already exists." });

    const newUser = await User.create({
      username: username,
      email: email,
      password: await hashPassword(password),
    });

    req.session.isLoggedIn = true;
    req.session.username = newUser.username;
    req.session.userId = newUser.id;
    req.session.save();

    console.log("[UPDATE] New user registered:", req.session.username);
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    console.error("[ERROR] Error during registration:", error);
    return res.status(500).json({ messsage: error });
  }
});

router.post("/login", async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;

  try {
    // console.log("started finding user at :", new Date());
    const user = await User.findOne({ username }).exec();
    // console.log("found at :", new Date());

    if (!user) {
      return res.status(400).json({ message: "Account does not exist." });
    }

    console.log("started checking password at: ", new Date());
    const isCorrectPassword = await comparePassword(password, user.password);
    console.log("finished checking password at: ", new Date());
    if (isCorrectPassword) {
      req.session.isLoggedIn = true;
      req.session.username = user.username;
      req.session.userId = user.id;
      // console.log("started saving session to db at: ", new Date());
      req.session.save();
      // console.log("finished saving session to db at: ", new Date());
      console.log("[UPDATE] New user logged in:", req.session.username);
      res.status(201).json({ message: "User logged in successfully." });
    } else {
      res.status(401).json({ message: "Wrong password entered." });
    }
    return;
  } catch (error: any) {
    console.log("[ERROR] Error during login:", error);
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
});

router.get("/checkLoggedIn", async (req: Request, res: Response) => {
  // console.log(req.session, req.sessionID, req.session.username);
  if (!req.session.isLoggedIn) {
    res.status(200).json({ isLoggedIn: false, username: null });
    return;
  } else {
    res.status(200).json({ isLoggedIn: true, username: req.session.username });
  }
});

router.post("/logout", async (req: Request, res: Response) => {
  const username = req.session.username;
  req.session.destroy((err) => {
    if (!err) {
      console.log(`[SERVER] User ${username} has logged out.`);
      res.status(200).json({ message: "Logged out successfully." });
      return;
    }

    console.log(`[ERROR] User ${username} could not log out:`, err);
    res.status(500).json({ message: "something happened." });
  });
});

router.post("/verify", async (req: Request, res: Response) => {
  const { captchaVal } = req.body;

  try {
    const data = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${captchaVal}`,
      {
        method: "POST",
        // body: JSON.stringify({
        //   secret: process.env.SECRET_KEY,
        //   response: captchaVal,
        // })
      }
    );

    res.send(data);
  } catch (error) {
    console.error("[ERROR] An error occured while verifying captcha:", error);
  }
});

export default router;
