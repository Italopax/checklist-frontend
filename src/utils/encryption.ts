import jwt from "jsonwebtoken";

interface EncryptionInterface {
  decriyt(token: string): { [key: string]: any };
}

export default class Encryption implements EncryptionInterface {
  public decriyt(token: string): { [key: string]: any; } {
    const tokenData = jwt.decode(token);

    return tokenData as object;
  }
}