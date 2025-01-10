import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { orders } from "../schemas";


export type Order = InferSelectModel<typeof orders>;

export type NewOrder = InferInsertModel<typeof orders>;
