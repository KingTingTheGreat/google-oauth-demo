const crypto = require("crypto");

export const generateSessionId = (): string => {
  return crypto.randomBytes(16).toString("hex");
};
