import { injectable } from "inversify";
import crypto from "crypto";

export interface CryptService {
  generateHash(bytes?: number): string;

  generateSaltedHash(value: string, salt: string): Promise<string>;
}

@injectable()
export class CryptServiceImpl implements CryptService {
  generateHash(bytes = 32): string {
    return crypto.randomBytes(bytes).toString("hex");
  }

  async generateSaltedHash(value: string, salt: string): Promise<string> {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(value, salt, 1e5, 512, "sha256", (e, password) => {
        if (e) return reject(e);
        resolve(password.toString("hex"));
      });
    });
  }
}
