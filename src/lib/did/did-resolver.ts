import { DIDDoc } from './did-doc'

/**
 * Interface for DID Documents (https://www.w3.org/TR/did-core/#did-resolution) resolving.
 */
export interface DIDResolver {
  resolve(did: string): Promise<DIDDoc>
}
