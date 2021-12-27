import { DIDSecrets } from './did-secrets'

export interface DIDSecretsResolver {
  resolve(did: string): Promise<DIDSecrets>
}
