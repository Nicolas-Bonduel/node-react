import { Pool } from "pg";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { env } from "./env";

import * as schema from "../schemas";

const { DATABASE_URL } = env;
export const pool = new Pool({
    connectionString: DATABASE_URL
});

export const db: NodePgDatabase<typeof schema> = drizzle(pool, { schema });