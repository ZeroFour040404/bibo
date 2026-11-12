export const TASK_STATUS = {
    ASSIGNED: "assigned",
    PENDING: "pending",
    IN_PROGRESS: "in_progress",
    COMPLETED: "completed",
    LATE: "late",
    APPROVED: "approved",
};

export const ROLES = {
    PARENT: "parent",
    CHILD: "child"
};

export const LIMITS = {
    MINUTES_PER_TASK: 5,
    MAX_MINUTES_PER_TASK: 120,
    MAX_POINTS_PER_TASK: 1000,
    MAX_POINTS_PER_DAY: 5000,
    MAX_PHOTO_SIZE_BYTES: 2 * 1024 * 1024, // 2MB
};