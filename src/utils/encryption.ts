import jwt from "jsonwebtoken";

interface EncryptionInterface {
  decriyt(token: string): { [key: string]: unknown };
}

export default class Encryption implements EncryptionInterface {
  public decriyt(token: string): { [key: string]: unknown; } {
    const tokenData = jwt.decode(token);

    return tokenData as object;
  }
}