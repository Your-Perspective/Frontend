import CryptoJS from "crypto-js";
import secureLocalStorage from "react-secure-storage";

type EncryptFunction = (message: string, secretKey: string) => string | null;
type DecryptFunction = (ciphertext: string, secretKey: string) => string | null;

export const encrypt: EncryptFunction = (message, secretKey) => {
  try {
    return CryptoJS.AES.encrypt(message, secretKey).toString();
  } catch (err) {
    console.error("Encrypt secret key error:", err);
    return null;
  }
};

export const storeRefresh = (refresh: string): void => {
  try {
    const prefix = process.env.NEXT_PUBLIC_SECURE_LOCAL_STORAGE_PREFIX || "";
    secureLocalStorage.setItem(prefix, refresh);
  } catch (e) {
    console.error("Storage operation failed:", e);
  }
};

export const secureRefresh = (refreshToken: string): void => {
  try {
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "";
    const encryptedToken = encrypt(refreshToken, secretKey);
    if (encryptedToken) {
      storeRefresh(encryptedToken);
    } else {
      throw new Error("Failed to encrypt the token.");
    }
  } catch (error) {
    console.error("Encryption error:", error);
  }
};

export const decrypt: DecryptFunction = (ciphertext, secretKey) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    if (plaintext === "") {
      throw new Error("Decryption succeeded but returned an empty string.");
    }
    return plaintext;
  } catch (err) {
    console.error("Decrypt secret key error:", err);
    return null;
  }
};

export const getDecryptedRefresh = async (): Promise<string | null> => {
  try {
    const encryptedRefresh = getRefresh();
    if (!encryptedRefresh) {
      console.error("Encrypted refresh token is empty.");
      return null;
    }
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
    if (!secretKey) {
      console.error("Secret key is undefined.");
      return null;
    }

    return decrypt(encryptedRefresh, secretKey);
  } catch (error) {
    console.error("An error occurred during decryption:", error);
    return null;
  }
};

export const getRefresh = (): string | null => {
  const prefix = process.env.NEXT_PUBLIC_SECURE_LOCAL_STORAGE_PREFIX || "";
  const refresh = secureLocalStorage.getItem(prefix) as string | null;

  if (refresh === null) {
    console.error("No refresh token found in secureLocalStorage.");
  }
  return refresh;
};

export const removeRefresh = (): void => {
  const prefix = process.env.NEXT_PUBLIC_SECURE_LOCAL_STORAGE_PREFIX || "";
  secureLocalStorage.removeItem(prefix);
};
