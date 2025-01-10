import { db } from "../config/pool";
import { eq } from "drizzle-orm";
import { users } from "../schemas";
import { User, NewUser } from "../entities/User";
import { logger } from "../utils";


export const getAllUsers = () => {
    try {
        return db.query.users.findMany({});
    }
    catch (err: any) {
        logger.error(`Err. getAllUsers() - ${err.message}`);
        throw err;
    }
};

export const getUserById = (id: string) => {
    try {
        return db.query.users.findFirst({
            where: eq(users.id, id)
        });
    }
    catch (err: any) {
        logger.error(`Err. getUserById() - ${err.message}`);
        throw err;
    }
};

export const findByUsername = (username: string) => {
    try {
        return db.query.users.findFirst({
            where: eq(users.username, username)
        });
    }
    catch (err: any) {
        logger.error(`Err. findByUsername() - ${err.message}`);
        throw err;
    }
};

export const findByEmail = (email: string) => {
    try {
        return db.query.users.findFirst({
            where: eq(users.email, email)
        });
    }
    catch (err: any) {
        logger.error(`Err. findByEmail() - ${err.message}`);
        throw err;
    }
};

export const addUser = (user: NewUser) => {
    try {
        return db.insert(users).values(user).returning().execute();
    }
    catch (err: any) {
        logger.error(`Err. addUser() - ${err.message}`);
        throw err;
    }
};

export const updateUser = (user: Partial<User> & { id: string }) => {
    try {
        return db.update(users).set(user).where(
            eq(users.id, user.id)
        ).returning().execute();
    }
    catch (err: any) {
        logger.error(`Err. updateUser() - ${err.message}`);
        throw err;
    }
}