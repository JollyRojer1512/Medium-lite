export enum MainErrorCodes {
  unexpectedError = -42400,
  serverIsListening = -41199,

  userNotFound = -40499,
  postNotFound = -40499,
}

export enum DbErrorCodes {
  PrimaryKeyAlreadyExists = 19,
}
