import {
  AnoncryptAlg,
  AuthcryptAlg,
  DIDResolver,
  DIDSecretsResolver,
  Message,
  MessagePacker,
  MessageUnpacker,
  SignAlg,
} from '../lib';

document.querySelector("body").innerHTML = `<h1>Hello World!</h1>`;

(async () => {
  // Instantiate DIDResolver and DIDSecretsResolver instances
  let didResolver = undefined as DIDResolver
  let secretsResolver = undefined as DIDSecretsResolver

  // Build message using builder.
  let msg = Message.build({
    id: 'f0a,8f2e0-d6f6-4661-87d5-94b53a7f7183',
    type: 'example',
    from: 'did:example:alice',
    to: ['did:example:bob1', 'did:example:bob2'],
    custom_headers: [
      ['some-header', 'some-value'],
      ['more-header', 'more-value'],
    ],
    created_time: new Date(),
    expires_time: new Date(),
    body: { say: 'hello' },
    attachements: [
      {
        id: 'attachment#1',
        filename: 'image.png',
        media_type: 'image/png',
        data: {
          base64: 'aW1hZ2U=',
        },
      },
    ],
  })

  // Note msg.as_plain() allow to get it as plain string.
  let plain_msg = msg.as_plain()

  // Instantiate message packer
  let packer = new MessagePacker({
    didResolver,
    secretsResolver,
  })

  // Authcrypt message with default method and specific did and secrets resolvers
  let authcrypted = await packer.authcrypt(msg)

  // Custom method
  let authcrypted1 = await packer.authcrypt(msg, {
    alg: AuthcryptAlg.ECDH_1PU_A256KW_AES_CBC_HMAC_SHA2,
  })

  // Anocrypt message with default method and specific did and secrets resolvers
  let anoncrypted = await packer.anoncrypt(msg)

  // Anocrypt and sign message with default method and specific did and secrets resolvers
  let anoncrypted_signed = packer.anoncrypt_signed(msg, {
    from: 'did:example:carol',
    anoncrypt_alg: AnoncryptAlg.ECDH_ES_A256KW_XC20P,
    sign_alg: SignAlg.EdDSA,
  })

  // Sign message with default method and specific did and secrets resolvers
  let signed = packer.sign(msg)

  // Instantiate message unpacker
  let unpacker = new MessageUnpacker({
    didResolver,
    secretsResolver,
  })

  // Unpack received message with default options
  let [_unpacked_msg, _unpack_metadata] = await unpacker.unpack('...')
})()
