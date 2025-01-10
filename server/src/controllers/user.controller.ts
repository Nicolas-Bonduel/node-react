import { Request, Response } from "express";
import { updateUser } from "../models/user.model";
import { logger } from "../utils"


export const editAccount = async (request: Request, response: Response) => {

    try {
        const { firstname, lastname, email } = request.body;

        const user = await updateUser({
            id: response.locals.user.id,
            firstname,
            lastname,
            email
        });

        response.status(200).json({
            user: user,
            message: "Account edited successfully"
        });
    }
    catch (err: any) { /* TODO validation error case */
        logger.error(`Err. editAccount() - ${err.message}`);
        response.status(500).json({
            message: "Internal Server Error"
        });
    }
}