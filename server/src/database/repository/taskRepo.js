import { db } from "../index.js";

export const insertTask = (task) => {
    const stmt = db.prepare(
      `INSERT INTO tasks (id, family_id, title, icon, description, duration, points, status, created_at) 
       VALUES (@id, @family_id, @title, @icon, @description, @duration, @points, @status, @created_at)`);
    const info = stmt.run(task);
    return info.lastInsertRowid;
}

export const getTasksByFamilyId = (familyId) => {
    const stmt = db.prepare(
      `SELECT * FROM tasks WHERE family_id = ?`);
    return stmt.all(familyId);
}

export const getTaskById = (taskId) => {
    const stmt = db.prepare(
      `SELECT * FROM tasks WHERE id = ?`);
    return stmt.get(taskId);
}