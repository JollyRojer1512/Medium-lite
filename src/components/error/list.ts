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

export class InvalidParamError extends BaseError {
  constructor(name: string, lang: UserLanguage = UserLanguage.ru) {
    const message = {
      uz: `Invalid Param ${name}`,
      ru: `Invalid Param ${name}`,
      en: `Invalid Param ${name}`,
    };
    super(message[lang], ErrorCodes.serverIsListening);
  }
}
