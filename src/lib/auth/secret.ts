import * as Crypto from 'expo-crypto';

export const PIN_LENGTH = 4;

async function digest(secret: string, salt: string): Promise<string> {
  return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, `${salt}:${secret}`);
}

export async function hashSecret(secret: string): Promise<{ hash: string; salt: string }> {
  const salt = Crypto.randomUUID();
  const hash = await digest(secret, salt);
  return { hash, salt };
}

export async function verifySecret(secret: string, hash: string, salt: string): Promise<boolean> {
  const candidate = await digest(secret, salt);
  return candidate === hash;
}
