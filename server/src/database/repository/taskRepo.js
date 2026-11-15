import { db } from "../index.js";

export const insertTask = (task) => {
    const stmt = db.prepare(
      `INSERT INTO tasks (id, family_id, title, icon, minutes, points, status, created_at) 
       VALUES (@id, @family_id, @title, @icon, @minutes, @points, @status, @created_at)`);
    const info = stmt.run(task);
    return info.lastInsertRowid;
}

export const getTasksByFamilyId = (familyId) => {
    const stmt = db.prepare(
      `SELECT * FROM tasks WHERE family_id = ? ORDER BY created_at DESC`); //added order by to sort tasks
    return stmt.all(familyId);
}

export const getTaskById = (taskId) => {
    const stmt = db.prepare(
      `SELECT * FROM tasks WHERE id = ?`);
    return stmt.get(taskId);
}

export const updateTaskStatus = (taskId, fields) => {
  const stmt = db.prepare(
    `UPDATE tasks 
      SET status = @status, 
          started_at = COALESCE(@started_at, started_at),
          submitted_at = COALESCE(@submitted_at, submitted_at),
          decided_at = COALESCE(@decided_at, decided_at),
          photo_file = COALESCE(@photo_file, photo_file),
          reject_note = COALESCE(@reject_note, reject_note),
          reject_count = COALESCE(@reject_count, reject_count)
     WHERE id = @id`
  );
  stmt.run({
    id: taskId,
    status: fields.status,
    started_at: fields.started_at ?? null,
    submitted_at: fields.submitted_at ?? null,
    decided_at: fields.decided_at ?? null,
    photo_file: fields.photo_file ?? null,
    reject_note: fields.reject_note ?? null,
    reject_count: fields.reject_count ?? null
  });
  return getTaskById(taskId);
}