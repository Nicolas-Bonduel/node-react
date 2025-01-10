import { Request, Response } from "express";
import { logger } from "../utils"
import { getAllProducts } from "../models/product.model";


export const getProducts = async (request: Request, response: Response) => {
    try {
        const products = await getAllProducts();

        response.status(200).json(products);
    }
    catch (err: any) {
        logger.error(`Err. getProducts() - ${err.message}`);
        response.status(500).json({
            message: "Internal Server Error"
        });
    }
}