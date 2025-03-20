import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import cors from "./config/corsOptions";
import { connectDB, gracefulShutdown } from "./config/db";

import authRoute from "./routes/authRoute";
import postRoute from "./routes/postRoute";
import userRoute from "./routes/userRoute";
import commentRoute from "./routes/commentRoute";
import voteRoute from "./routes/voteRoute";
import User, { IUser } from "./models/user";
import { FilterQuery, Model, RootFilterQuery, Schema } from "mongoose";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

// Connect to DB
connectDB();

// Middleware
app.use(express.json());
app.use(cors);

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server is running!");
});

app.use(authRoute);
app.use(postRoute);
app.use(userRoute);
app.use(commentRoute);
app.use(voteRoute);

// create default users.
app.listen(PORT, async () => {
  console.log(`[SERVER]: Running at http://localhost:${PORT}`);

  async function createDefaultUser(username: string, email: string) {
    const hasBeenCreated = await User.findOne({ username });
    if (!hasBeenCreated) {

      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password: "1",
          confirmPW: "1"
        }),
      })

      if (response.ok) console.log(`successfully created ${username}.`);
    }
  }

  createDefaultUser("ANTHIMON", "anthony@gmail.com")
  createDefaultUser("Protea", "bro@gmail.com")
});

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGQUIT', gracefulShutdown);