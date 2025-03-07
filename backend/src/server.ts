import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { corsOptions } from "./corsOptions";
import mongoose, { MongooseOptions } from "mongoose";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/LR2TDB";
const mongoOptions: MongooseOptions = {};

app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server is running!");
});

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("[DATABASE]: Connected to MongoDB.");
  } catch (error) {
    console.error("[ERROR] Database error:", error);
    process.exit(1);
  }
}

// Routes
// <INSERT ROUTES HERE>

app.listen(PORT, async () => {
  await connectDB();
  console.log(`[SERVER]: Running at http://localhost:${PORT}`);
});