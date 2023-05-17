import { MultiLang, UserLanguage } from "../config";
import { DbErrorCodes } from "./codes";
import { BaseError, ErrorPresenter } from "./main";

export type DBDefaultError = {
  query: string;
  parameters: string;
  errno: DbErrorCodes;
  code: string;
  message: string;
};

export type DbErrorParams = {
  field?: string;
};

export class DbError implements BaseError {
  private readonly code: DbErrorCodes;
  private readonly field: string | undefined;

  constructor(error: DBDefaultError, params?: DbErrorParams) {
    this.code = error.errno;
    this.field = params?.field;
  }

  presenter(lang: UserLanguage = UserLanguage.ru): ErrorPresenter {
    return {
      code: this.code,
      message: this.getMessageByErrorCode(this.code)[lang],
    };
  }

  getMessageByErrorCode(code: DbErrorCodes): MultiLang {
    switch (code) {
      case DbErrorCodes.PrimaryKeyAlreadyExists:
        return this.primaryKeyExistsMessage(this.field);
      default:
        return this.unexpectedError();
    }
  }

  private primaryKeyExistsMessage(field?: string): MultiLang {
    return {
      uz: `${field || "Ma'lumotlar"} allaqachon bor`,
      ru: `${field || "Одно из полей"} уже есть`,
      en: `${field || "field"} already exists`,
    };
  }

  private unexpectedError(): MultiLang {
    return {
      uz: "Kutilmagan xatolik",
      ru: "Непредвиденная ошибка",
      en: "Unexpected error",
    };
  }
}
