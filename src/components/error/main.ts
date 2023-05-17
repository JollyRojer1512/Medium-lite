import { MainErrorCodes } from "./codes";
import { UserLanguage } from "../config";

export type ErrorPresenter = {
  message: string;
  code: number;
};

export class BaseError {
  public constructor(
    readonly message: string,
    readonly code: MainErrorCodes,
    readonly externalError?: any
  ) {}

  presenter(): ErrorPresenter {
    return {
      message: this.message,
      code: this.code,
    };
  }
}

export class ServerIsListening extends BaseError {
  constructor(lang: UserLanguage = UserLanguage.ru) {
    const message = {
      uz: "Server allaqachon ishlamoqda",
      ru: "Сервер уже работает",
      en: "Server is listening",
    };
    super(message[lang], MainErrorCodes.serverIsListening);
  }
}

export class InvalidParam extends BaseError {
  constructor(name: string, lang: UserLanguage = UserLanguage.ru) {
    const message = {
      uz: `Invalid Param ${name}`,
      ru: `Invalid Param ${name}`,
      en: `Invalid Param ${name}`,
    };
    super(message[lang], MainErrorCodes.serverIsListening);
  }
}

export class UserNotFound extends BaseError {
  constructor(lang: UserLanguage = UserLanguage.ru) {
    const message = {
      uz: `Foydalanuvchi topilmadi`,
      ru: `Пользователь не найден`,
      en: `User not found`,
    };
    super(message[lang], MainErrorCodes.userNotFound);
  }
}

export class PostNotFound extends BaseError {
  constructor(lang: UserLanguage = UserLanguage.ru) {
    const message = {
      uz: `Post topilmadi`,
      ru: `Пост не найден`,
      en: `Post not found`,
    };
    super(message[lang], MainErrorCodes.postNotFound);
  }
}
