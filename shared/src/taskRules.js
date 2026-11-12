import { TASK_STATUS } from "./constants.js";

const MOVES = {
    [TASK_STATUS.ASSIGNED]: [TASK_STATUS.PENDING],
    [TASK_STATUS.PENDING]: [TASK_STATUS.IN_PROGRESS, TASK_STATUS.LATE],
    [TASK_STATUS.IN_PROGRESS]: [TASK_STATUS.COMPLETED],
    [TASK_STATUS.LATE]: [TASK_STATUS.COMPLETED],
    [TASK_STATUS.COMPLETED]: [TASK_STATUS.APPROVED],
    [TASK_STATUS.APPROVED]: [],
}

export const isValidMove = (currentStatus, newStatus) => {
    const validMoves = MOVES[currentStatus] || [];
    return validMoves.includes(newStatus);
}