export class DIDCommError {
  kind(): DIDCommErrorKind {
    return DIDCommErrorKind.DidNotFound
  }
}

export enum DIDCommErrorKind {
  DidNotFound,
  SecretNotFound,
  NoCompatibleCrypto,
  IOError,
  InvalidState,
  // TODO: FIXME: fill errors
}
