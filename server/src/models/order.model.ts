import { db } from "../config/pool";
import { eq } from "drizzle-orm";
import { orders } from "../schemas";
import { logger } from "../utils";
import { NewOrder } from "../entities/Order";


export const getOrderById = (id: number) => {
    try {
        return db.query.orders.findFirst({
            where: eq(orders.id, id)
        });
    }
    catch (err: any) {
        logger.error(`Err. getOrderById() - ${err.message}`);
        throw err;
    }
};

export const addOrder = (order: NewOrder) => {
    try {
        return db.insert(orders).values(order).returning({ id: orders.id }).execute();
    }
    catch (err: any) {
        logger.error(`Err. addOrder() - ${err.message}`);
        throw err;
    }
};

export const getOrdersByUSer = (userId: string) => {
    try {
        return db.select().from(orders).where(
            eq(orders.user, userId)
        ).execute()
    }
    catch (err: any) {
        logger.error(`Err. getOrdersByUSer() - ${err.message}`);
        throw err;
    }
};