import { randomBytes } from "crypto";

const ALPHABET =
  "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateShortCode(length = 7): string {
  const limit = 256 - (256 % ALPHABET.length);
  let out = "";

  while (out.length < length) {
    const bytes = randomBytes(length * 2);
    for (let i = 0; i < bytes.length; i++) {
      const b = bytes[i];
      if (b >= limit) continue;
      out += ALPHABET[b % ALPHABET.length];
      if (out.length === length) break;
    }
  }

  return out;
}
