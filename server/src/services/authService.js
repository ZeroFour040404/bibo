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

export const createFamily = ({familyCode, kidName, pin}) => {
    if (!familyCode || !kidName || !pin) {
        fail(400, "Family code, kid name, and PIN are required");
    }

    if (!/^\d{4}$/.test(String(pin))) {
        fail(400, "PIN must be 4 digits")
    }

    const normalizedCode = String(familyCode).trim().toUpperCase();
    const ifExists = familyRepo.getFamilyByCode(normalizedCode);
    if (ifExists) {
        fail(409, "Family code already exists");
    }

    const {salt, hash} = hashPin(pin);

    const family = {
        id: randomUUID(),
        family_code: normalizedCode,
        kid_name: String(kidName).trim(),
        pin_hash: hash,
        pin_salt: salt,
        created_at: new Date().toISOString(),
    };
    familyRepo.insertFamily(family);

    const token = jwt.sign(
        {familyId: family.id, role: ROLES.PARENT}, // data inside token to know which family and which role is making the request 
        config.TOKEN_SECRET,
        {expiresIn: "7d"} //token expires after 7 days
    );

    return {
        token, 
        role: ROLES.PARENT, 
        family: {
            id: family.id,
            familyCode: family.family_code,
            kidName: family.kid_name,
        }
    }
};

export const loginFamily = ({familyCode, role, pin}) => {
    if (!familyCode || !role) {
        fail(400, "Family code and role are required.")
    }

    if (![ROLES.PARENT, ROLES.CHILD].includes(role)) {
        fail(400, "Invalid role")
    }

    const normalizedCode = String(familyCode).trim().toUpperCase();
    const family = familyRepo.getFamilyByCode(normalizedCode);
    if(!family) {
        fail(404, "Family not found");
    }
    if(role === ROLES.PARENT) {
        if (!pin) {
            fail(400, "PIN is required for parent login");
        }
        if(!verifyPin(pin, family.pin_salt, family.pin_hash)) {
            fail(401, "Invalid PIN.")
        }
    }

    const token = jwt.sign(
        {familyId: family.id, role}, // data inside token to know which family and which role is making the request 
        config.TOKEN_SECRET,
        {expiresIn: "7d"} //token expires after 7 day
    )

    return {
        token, 
        role, 
        family: {
            id: family.id,
            familyCode: family.family_code,
            kidName: family.kid_name,
        }
    }
}