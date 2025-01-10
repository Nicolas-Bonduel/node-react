import { db } from "../config/pool";
import { eq } from "drizzle-orm";
import { products } from "../schemas";
import { NewProduct } from "../entities/Product";
import { logger } from "../utils";


export const getAllProducts = () => {
    try {
        return db.query.products.findMany({});
    }
    catch (err: any) {
        logger.error(`Err. getAllProducts() - ${err.message}`);
        throw err;
    }
};

export const getProductById = (id: number) => {
    try {
        return db.query.products.findFirst({
            where: eq(products.id, id)
        });
    }
    catch (err: any) {
        logger.error(`Err. getProductById() - ${err.message}`);
        throw err;
    }
};

/* export const addProduct = (product: NewProduct) => {
    try {
        return db.insert(products).values(product).execute();
    }
    catch (err: any) {
        logger.error(`Err. addProduct() - ${err.message}`);
        throw err;
    }
}; */
export const addProducts = (products_: (NewProduct)[]) => {
    try {
        return db.insert(products).values(products_).execute();
    }
    catch (err: any) {
        logger.error(`Err. addProducts() - ${err.message}`);
        throw err;
    }
};