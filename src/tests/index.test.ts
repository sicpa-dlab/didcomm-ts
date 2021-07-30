import { DIDAuthentication, DIDDoc, DIDKeyAgreement, DIDRouteKey } from '../lib/index'

class DIDDocImpl implements DIDDoc {
  _brand: 'DIDDoc'
  keyAgreements(): [DIDKeyAgreement] {
    throw new Error('Method not implemented.')
  }
  keyAgreement(kid: string): DIDKeyAgreement {
    throw new Error('Method not implemented.')
  }
  authentications(): [DIDAuthentication] {
    throw new Error('Method not implemented.')
  }
  authentication(kid: string): DIDAuthentication {
    throw new Error('Method not implemented.')
  }
  routeKeys(): [DIDRouteKey] {
    throw new Error('Method not implemented.')
  }
}

it('Runs without crashing', () => {
  let didDoc = new DIDDocImpl()
  didDoc.keyAgreement('did:example:alice')
})
