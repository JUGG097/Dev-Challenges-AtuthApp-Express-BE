import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || "";
export const PGUSER = process.env.PGUSER || "";
export const PGHOST = process.env.PGHOST || "";
export const PGDATABASE = process.env.PGDATABASE || "";
export const PGPASSWORD = process.env.PGPASSWORD || "";
export const PGPORT = Number(process.env.PGPORT) || 5342;
export const JWT_SECRET = process.env.JWT_SECRET || "";
export const JWT_EXPIRATION = Number(process.env.JWT_EXPIRATION) || 0;
