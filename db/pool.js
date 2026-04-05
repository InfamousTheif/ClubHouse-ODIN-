import { Pool } from "pg";
import "../utils/dotenv.js";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export { pool }