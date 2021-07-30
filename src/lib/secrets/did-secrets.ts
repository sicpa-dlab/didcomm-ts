/**
 * Provides secrets access for DID KeyAgreemet and Authentication sections.
 */
export interface DIDSecrets {
  keyAgreements(): [DIDKeyAgreementSecret]
  keyAgreement(kid: string): DIDKeyAgreementSecret
  authentications(): [DIDAuthenticationSecret]
  authentication(kid: string): DIDAuthenticationSecret
}

/**
 * Represents secret for DID KeyAgreemet (https://www.w3.org/TR/did-core/#key-agreement)
 */
export interface DIDKeyAgreementSecret {
  asJWK(): string // JWK
}

/**
 * Represents secret for DID Authentication (https://www.w3.org/TR/did-core/#authentication)
 */
export interface DIDAuthenticationSecret {
  asJWK(): string // JWK
}
