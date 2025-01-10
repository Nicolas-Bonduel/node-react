import { relations } from "drizzle-orm";
import { orderProducts, orders, products, users } from "./";


export const orderProductRelations = relations(orderProducts, ({ one }) => ({
    orders: one(orders),
    products: one(products)
}));

export const orderRelations = relations(orders, ({ one, many }) => ({
    orderProducts: many(orderProducts),
    users: one(users)
}));

export const productRelations = relations(products, ({ many }) => ({
    orderProducts: many(orderProducts)
}));

export const userRelations = relations(users, ({ many }) => ({
    orders: many(orders)
}));


