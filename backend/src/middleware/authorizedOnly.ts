import { NextFunction, Request, Response } from "express";

export async function IsLoggedIn(req: Request, res: Response, next: NextFunction) {
    const userId = req.session.userId;

    // checking if logged in.
    if (userId === undefined || userId === null) {
        res.status(401).json({ message: "User not logged in!" });
        return;
    }

    // passed the check! pass to the next middlware.
    next();
}
