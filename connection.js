import { dbobj } from "./config.js";
import sql from "mysql2";

export const db = sql.createPool(dbobj);
