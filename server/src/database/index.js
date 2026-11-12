const Database = pkg;
import pkg from "better-sqlite3";
import { readFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { config } from "../config.js";

mkdirSync(dirname(config.DB_PATH), { recursive: true });
export const db = new Database(config.DB_PATH);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(readFileSync(new URL("./schema.sql", import.meta.url), "utf-8"));