import { db } from "../index.js";

export const insertFamily = (family) => {
    const stmt = db.prepare(
      `INSERT INTO families (id, family_code, kid_name, pin_hash, pin_salt, created_at) 
       VALUES (@id, @family_code, @kid_name, @pin_hash, @pin_salt, @created_at)`);
    const info = stmt.run(family);
    return info.lastInsertRowid;
}