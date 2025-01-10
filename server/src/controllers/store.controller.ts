import { Request, Response } from "express";
import { logger } from "../utils"
import { getAllProducts, getProductById } from "../models/product.model";
import { addOrder, getOrdersByUSer } from "../models/order.model";
import { Product } from "../entities/Product";
import { addOrderProduct } from "../models/orderProduct.model";


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

export const purchase = async (request: Request, response: Response) => {
    try {
        const data: ({ product_id: number, qty: number })[] = request.body;

        const products: ({ product: Product, qty: number })[] = [];
        for (const {product_id: id, qty} of data) {
            const product = await getProductById(id);
            if (product === undefined)
                throw Error(`product id ${id} not found`);
            products.push({ product, qty });
        }
        const total = products.reduce((acc, p) => acc + (p.product.price * p.qty), 0);

        const [ { id: orderId } ] = await addOrder({
            total,
            user: response.locals.user.id
        });

        for (const { product, qty } of products) {
            const { id, ...exceptId } = product;
            await addOrderProduct({ ...exceptId, qty, order: orderId, product: product.id});
        }

        response.status(200).json({
            orderId: orderId
        });
    }
    catch (err: any) {
        logger.error(`Err. purchase() - ${err.message}`);
        response.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const getUserOrders = async (request: Request, response: Response) => {
    try {
        const orders = await getOrdersByUSer(response.locals.user.id);

        response.status(200).json(orders);
    }
    catch (err: any) {
        logger.error(`Err. getUserOrders() - ${err.message}`);
        response.status(500).json({
            message: "Internal Server Error"
        });
    }
}