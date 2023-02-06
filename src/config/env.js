import { config } from "dotenv";

config();

export const { JWT_ACCESS_SECRET, DB_URL } = process.env;
