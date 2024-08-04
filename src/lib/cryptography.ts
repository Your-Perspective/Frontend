import CryptoJS from "crypto-js";
import secureLocalStorage from "react-secure-storage";

// Define types for the encrypt and decrypt functions
type EncryptFunction = (message: string, secretKey: string) => string | null;
type DecryptFunction = (ciphertext: string, secretKey: string) => string;

// Encrypt refresh token
export const encrypt: EncryptFunction = (message, secretKey) => {
  let ciphertext: string | null = null;
  try {
    ciphertext = CryptoJS.AES.encrypt(message, secretKey).toString();
  } catch (err) {
    // console.error("Encrypt secret key error:", err);
  }
  return ciphertext;
};

// Store refresh token in secure local storage
export const storeRefresh = (refresh: string): void => {
  try {
    secureLocalStorage.setItem(
      process.env.NEXT_PUBLIC_SECURE_LOCAL_STORAGE_PREFIX || "",
      refresh
    );
  } catch (e) {
    // console.error("Storage operation failed: ", e);
  }
};

// Securely store the refresh token
export const secureRefresh = (refresh: string): void => {
  const encryptedRefresh = encrypt(
    refresh,
    process.env.NEXT_PUBLIC_SECRET_KEY || ""
  );
  if (encryptedRefresh) {
    storeRefresh(encryptedRefresh);
  }
};

// Decrypt refresh token
export const decrypt: DecryptFunction = (ciphertext, secretKey) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    if (plaintext === "") {
      throw new Error("Decryption succeeded but returned an empty string.");
    }
    return plaintext;
  } catch (err) {
    // console.error("Decrypt secret key error:", err);
    throw err; // rethrow the error to handle it in the calling function
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

    const decryptedRefresh = await decrypt(encryptedRefresh, secretKey);

    if (!decryptedRefresh) {
      console.error("Decryption failed or returned an empty result.");
      return null;
    }

    return decryptedRefresh;
  } catch (error) {
    console.error("An error occurred during decryption:", error);
    return null;
  }
};

// Get refresh token from secure local storage
export const getRefresh = (): string | null => {
  const refresh = secureLocalStorage.getItem(
    process.env.NEXT_PUBLIC_SECURE_LOCAL_STORAGE_PREFIX || ""
  ) as string | null;
  if (typeof refresh === "undefined") {
    // console.error("No refresh token found in secureLocalStorage.");
  }
  return refresh;
};

// Remove refresh token from secure local storage
export const removeRefresh = (): void => {
  secureLocalStorage.removeItem(
    process.env.NEXT_PUBLIC_SECURE_LOCAL_STORAGE_PREFIX || ""
  );
};
