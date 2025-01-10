import { integer, pgTable, real, serial, text, varchar } from "drizzle-orm/pg-core"
import { products } from "./products";
import { orders } from "./orders";


export const orderProducts =  pgTable('order_products', { 
    id : serial().primaryKey(),
    title: varchar().notNull(),
    price: real().notNull(),
    description: text().notNull(),
    category: varchar(),
    image: varchar(),
    qty: integer(),
    order: integer().references(() => orders.id).notNull(),
    product: integer().references(() => products.id)
});