import { randomBytes, randomUUID, scryptSync, timingSafeEqual} from "node:crypto";
import jwt from "jsonwebtoken";
import { ROLES } from "shared";
import { config } from "../config.js";
import * as familyRepo from "../database/repository/familyRepo.js";

const fail = (status, message) => {
    Object.assign(new Error(message), { status })
};