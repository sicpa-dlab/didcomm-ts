/**
 * Represendts DID Document (https://www.w3.org/TR/did-core/#dfn-did-documents)
 */
export interface DIDDoc {
  _brand: 'DIDDoc'
  keyAgreements(): [DIDKeyAgreement] // [pubJWK]
  keyAgreement(kid: string): DIDKeyAgreement // pubJWK
  authentications(): [DIDAuthentication] // [pubJWK]
  authentication(kid: string): DIDAuthentication // pubJWK
  routeKeys(): [DIDRouteKey]
}

/**
 * Represents KeyAgreement record in DID Document  (https://www.w3.org/TR/did-core/#key-agreement)
 */
export interface DIDKeyAgreement {
  _brand: 'DIDKeyAgreement'
  asJWK(): string // public JWK
}

/**
 * Represents Authentication record in DID Document (https://www.w3.org/TR/did-core/#authentication)
 */
export interface DIDAuthentication {
  _brand: 'DIDAuthentication'
  asJWK(): string // public JWK
}

/**
 * Represents RouteKey record in DID Document (FIXME: provide link)
 */
export interface DIDRouteKey {
  _brand: 'DIDRouteKey'
  asJWK(): string // public JWK
}
