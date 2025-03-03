import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { corsOptions } from "./corsOptions";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", cors(corsOptions), (req, res, next) => next())

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Serverrrrr");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});