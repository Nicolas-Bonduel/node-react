import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getUserById } from "../models/user.model";

import { env } from "../config/env";
const { JWT_SECRET } = env;


export const authMiddleware = async(req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;
    if (!accessToken) {
        res.status(401).json({
            message: "Unauthorized"
        });
        return;
    }

    try {
        const { userId }: any = jwt.verify(accessToken, JWT_SECRET);
        const user = await getUserById(userId);
        res.locals.user = user;
        next();
    }
    catch (err) {
        res.status(401).json({
            message: "Invalid token"
        });
    }
}