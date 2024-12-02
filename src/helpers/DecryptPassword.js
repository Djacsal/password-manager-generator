import { safeStorage } from "electron";

export const DecryptPassword = (password) => {
  const dePassword = safeStorage.decryptString(password);
  return dePassword;
};
