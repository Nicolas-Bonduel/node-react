import { db } from "../config/pool";
import { eq } from "drizzle-orm";
import { orderProducts } from "../schemas";
import { logger } from "../utils";
import { NewOrderProduct } from "../entities/OrderProduct";


export const getOrderProductById = (id: number) => {
    try {
        return db.query.orderProducts.findFirst({
            where: eq(orderProducts.id, id)
        });
    }
    catch (err: any) {
        logger.error(`Err. getOrderProductById() - ${err.message}`);
        throw err;
    }
};

export const addOrderProduct = (orderProduct: NewOrderProduct) => {
    try {
        return db.insert(orderProducts).values(orderProduct).returning({ id: orderProducts.id }).execute();
    }
    catch (err: any) {
        logger.error(`Err. addOrderProduct() - ${err.message}`);
        throw err;
    }
};