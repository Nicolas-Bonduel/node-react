import { integer, pgTable, real, serial, timestamp, uuid } from "drizzle-orm/pg-core"
import { users } from "./users";


export const orders =  pgTable('orders', { 
    id : serial().primaryKey(),
    date:  timestamp('date').notNull().defaultNow(),
    total: real().notNull(),
    user: uuid().references(() => users.id)
});