import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { hashPassword, logger, verifyPassword } from "../utils";
import { addUser, findByUsername } from "../models/user.model";
import { validateRegister } from "../validation/register.validation";

import { env } from "../config/env";
const { NODE_ENV, JWT_SECRET } = env;


export const register = async (request: Request, response: Response) => {

    try {
        const { username, password, firstname, lastname, email } = validateRegister(request.body);

        /* TODO unique username & email (in validation) */

        const hash = await hashPassword(password);

        const [ newUser ] = await addUser({
            username,
            password: hash,
            email,
            firstname,
            lastname
        });

        const accessToken = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '1h' });
        response.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: NODE_ENV === "production"
        });

        response.status(200).json({
            user: newUser,
            message: "Registered successfully"
        });
    } 
    catch (err: any) {
        if (err instanceof z.ZodError) {
            response.status(400).json({
                errors: err.errors,
                message: "Invalid form data"
            });
            return;
        }

        logger.error(`Err. register() - ${err.message}`);

        response.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const login = async (request: Request, response: Response) => {
    try {
        const { username, password } = request.body;
        const user = await findByUsername(username);
        if (!user) {
            response.status(401).json({
                message: "Invalid Credentials"
            });
            return;
        }
        logger.info(await verifyPassword(user.password, password));
        if (await verifyPassword(user.password, password) === false) {
            response.status(401).json({
                message: "Invalid Credentials"
            });
            return;
        }

        const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        response.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: NODE_ENV === "production"
        });

        response.status(200).json({
            user: user,
            message: "Logged in"
        });
    }
    catch (err: any) {
        logger.error(`Err. login() - ${err.message}`);
        response.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const relogin = async (request: Request, response: Response) => {
    try {
        const user = response.locals.user;

        const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        response.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: NODE_ENV === "production"
        });

        response.status(200).json({
            user: user,
            message: "Logged in"
        });
    }
    catch (err: any) {
        logger.error(`Err. relogin() - ${err.message}`);
        response.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const logout = (request: Request, response: Response) => {
    response.clearCookie('accessToken');
    response.status(200).json({
        message: "Logged out"
    });
}