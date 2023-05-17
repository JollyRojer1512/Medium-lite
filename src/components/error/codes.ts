export enum MainErrorCodes {
  unexpectedError = -42400,
  serverIsListening = -41199,
  invalidParameter,
  invalidLoginData,

  userNotFound = -40499,
  postNotFound = -40499,
}

export enum DbErrorCodes {
  PrimaryKeyAlreadyExists = 19,
}
