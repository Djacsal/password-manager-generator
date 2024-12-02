import { safeStorage } from "electron";

export const EncryptPassword = (password) => {
  if (safeStorage.isEncryptionAvailable()) {
    return safeStorage.encryptString(password);
  } else {
    console.error("Шифрование недоступно");
    return null;
  }
};
