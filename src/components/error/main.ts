import { MainErrorCodes } from "./codes";
import { MultiLang, UserLanguage } from "../config";

export type ErrorPresenter = {
  message: string;
  code: number;
};

export interface BaseError {
  presenter(lang?: UserLanguage): ErrorPresenter;
}

export class ServerIsListening implements BaseError {
  private readonly code = MainErrorCodes.serverIsListening;

  constructor(private readonly lang: UserLanguage = UserLanguage.ru) {}

  presenter(lang = this.lang): ErrorPresenter {
    return {
      message: this.getMessage()[lang],
      code: this.code,
    };
  }

  private getMessage(): MultiLang {
    return {
      uz: "Server allaqachon ishlamoqda",
      ru: "Сервер уже работает",
      en: "Server is listening",
    };
  }
}

export class InvalidParam implements BaseError {
  private readonly code = MainErrorCodes.invalidParameter;

  constructor(
    private readonly name: string,
    private readonly lang: UserLanguage = UserLanguage.ru
  ) {}

  presenter(lang = this.lang): ErrorPresenter {
    return {
      message: this.getMessage()[lang],
      code: this.code,
    };
  }

  private getMessage(): MultiLang {
    return {
      uz: `Invalid Param ${this.name}`,
      ru: `Invalid Param ${this.name}`,
      en: `Invalid Param ${this.name}`,
    };
  }
}

export class UnexpectedError implements BaseError {
  private readonly code = MainErrorCodes.unexpectedError;

  constructor(
    private readonly message: string,
    private readonly lang: UserLanguage = UserLanguage.ru
  ) {}

  presenter(lang = this.lang): ErrorPresenter {
    return {
      message: this.getMessage()[lang],
      code: this.code,
    };
  }

  private getMessage(): MultiLang {
    return {
      uz: `Kutilmagan xatolik: ${this.message}`,
      ru: `Непредвиденная ошибка: ${this.message}`,
      en: `Unexpected error: ${this.message}`,
    };
  }
}

export class UserNotFound implements BaseError {
  private readonly code = MainErrorCodes.userNotFound;

  constructor(private readonly lang: UserLanguage = UserLanguage.ru) {}

  presenter(lang = this.lang): ErrorPresenter {
    return {
      message: this.getMessage()[lang],
      code: this.code,
    };
  }

  private getMessage(): MultiLang {
    return {
      uz: `Foydalanuvchi topilmadi`,
      ru: `Пользователь не найден`,
      en: `User not found`,
    };
  }
}

export class InvalidLoginData implements BaseError {
  private readonly code = MainErrorCodes.invalidLoginData;

  constructor(private readonly lang: UserLanguage = UserLanguage.ru) {}

  presenter(lang = this.lang): ErrorPresenter {
    return {
      message: this.getMessage()[lang],
      code: this.code,
    };
  }

  private getMessage(): MultiLang {
    return {
      uz: `Email yoki Parol noto'gri terilgan`,
      ru: `Email или Пароль введены неверно`,
      en: `Email or Password are incorrect`,
    };
  }
}

export class PostNotFound implements BaseError {
  private readonly code = MainErrorCodes.postNotFound;

  constructor(private readonly lang: UserLanguage = UserLanguage.ru) {}

  presenter(lang = this.lang): ErrorPresenter {
    return {
      message: this.getMessage()[lang],
      code: this.code,
    };
  }

  private getMessage(): MultiLang {
    return {
      uz: `Post topilmadi`,
      ru: `Пост не найден`,
      en: `Post not found`,
    };
  }
}
