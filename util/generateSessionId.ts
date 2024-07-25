import { SESSION_ID_LENGTH } from "@/constants";

const crypto = require("crypto");

export const generateSessionId = (): string => {
  return crypto.randomBytes(SESSION_ID_LENGTH).toString("hex");
};
