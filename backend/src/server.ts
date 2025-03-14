import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "./config/corsOptions";
import { connectDB, gracefulShutdown } from "./config/db";

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

// <INSERT ROUTES HERE>

app.listen(PORT, () => {
  console.log(`[SERVER]: Running at http://localhost:${PORT}`);
});

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGQUIT', gracefulShutdown);