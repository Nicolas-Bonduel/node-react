import { IEnvConfig } from "../types/env";
import dotenv from "dotenv";

dotenv.config();

export const env: IEnvConfig = {
    PORT: parseInt(process.env.PORT || "0000"),
    JWT_SECRET: process.env.JWT_SECRET || "",
    NODE_ENV: process.env.NODE_ENV as "development" | "production" | "test",
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:0000",
    DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:user@localhost:0000/3wa"
};