import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { orderProducts } from "../schemas";


export type OrderProduct = InferSelectModel<typeof orderProducts>;

export type NewOrderProduct = InferInsertModel<typeof orderProducts>;
