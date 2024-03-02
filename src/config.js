import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 8000;
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD =
  process.env.DB_PASSWORD || "cd6G6BCGDa6DDg6443G6GD-Db23eGe46";
export const DB_HOST = process.env.DB_HOST || "viaduct.proxy.rlwy.net";
export const DB_DATABASE = process.env.DB_DATABASE || "railway";
export const DB_PORT = process.env.DB_PORT || 51315;
