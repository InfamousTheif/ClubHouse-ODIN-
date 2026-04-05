import { Pool } from "pg";
import "../utils/dotenv.js";

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DATABASE,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT  
});

export { pool }