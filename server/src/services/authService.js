import { randomBytes, randomUUID, scryptSync, timingSafeEqual} from "node:crypto";
import jwt from "jsonwebtoken";
import { ROLES } from "shared";
import { config } from "../config.js";
import * as familyRepo from "../database/repository/familyRepo.js";

const fail = (status, message) => {
   throw Object.assign(new Error(message), { status })
};

const hashPin = (pin) => {
    const salt = randomBytes(16).toString("hex");
    const hash = scryptSync(String(pin), salt, 64).toString("hex"); //wrap pin in String so it doesnt crash when numnber is passed
    return {salt, hash};
};

const verifyPin = (pin, salt, storedHash) => {
    const storedBuffer = Buffer.from(storedHash, "hex"); //turns hex strings to binary bytes 
    const testBuffer = scryptSync(String(pin), salt, 64);

    if (storedBuffer.length !== testBuffer.length) {
        return false;
    }
    return timingSafeEqual(storedBuffer, testBuffer);

}