import { NextFunction, Request, Response } from "express";

export async function IsLoggedIn(req: Request, res: Response, next: NextFunction) {
    const userId = req.session.userId;
    console.log(req.session);

    // checking if logged in.
    if (userId === undefined || userId === null) {
        console.log("entered the thing");
        res.status(401).json({ message: "user not logged in!" });
        return;
    }

    // passed the check! pass to the next middlware.
    next();
} 