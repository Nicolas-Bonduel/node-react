import { pgTable, real, serial, text, varchar } from "drizzle-orm/pg-core"


export const products =  pgTable('products', { 
    id : serial().primaryKey(),
    title: varchar().notNull(),
    price: real().notNull(),
    description: text().notNull(),
    category: varchar(),
    image: varchar(),
});