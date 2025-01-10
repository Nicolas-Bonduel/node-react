import { Pool } from "pg";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { addProducts } from "../models/product.model";
import fetch from "node-fetch";
import { inspect } from "util";
import { logger } from "../utils";

import { env } from "../config/env";
const { DATABASE_URL } = env;


async function main() {
    const
        pool = new Pool({ connectionString: DATABASE_URL }),
        db: NodePgDatabase = drizzle(pool);

    console.info('Fetching seed ...');
    const products: any = await fetch('https://fakestoreapi.com/products').then(res => res.json());
    /*logger.info(inspect(products)); await pool.end(); return;*/
    console.info('Seeding database ...');
    addProducts(products);
    console.log('Database seeded successfully');

    await pool.end();
}

main()