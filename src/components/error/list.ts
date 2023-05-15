import { ErrorCodes } from "./codes";
import { UserLanguage } from "../config";

export class BaseError {
  public constructor(
    readonly message: string,
    readonly code: ErrorCodes,
    readonly externalError?: any
  ) {}
}

export class ServerIsListeningError extends BaseError {
  constructor(lang: UserLanguage = UserLanguage.ru) {
    const message = {
      uz: "Server allaqachon ishlamoqda",
      ru: "Сервер уже работает",
      en: "Server is listening",
    };
    super(message[lang], ErrorCodes.serverIsListening);
  }
}
