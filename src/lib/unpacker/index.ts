import { DIDResolver } from '../did'
import { Message } from '../message'
import { DIDSecretsResolver } from '../secrets'

/**
 * Provides message unpacking helper.
 */
export class MessageUnpacker {
  /**
   * Construct message packer instance.
   * @param props configuration properties
   */
  constructor(props: MessageUnpackerProps) {}

  /**
   * Unpack the message
   * @param msg message to unpack
   * @param opts unpacking options
   * @returns unpacked message with additional metadata
   * @throws DIDCommError
   */
  unpack(msg: string, opts?: UnpackOpts): Promise<UnpackResult> {
    return Promise.resolve([
      new Message(),
      {
        authcrypt_from: undefined,
        sign_from: undefined,
        verified_to: undefined,
        rewrapped: true,
      },
    ])
  }
}

/**
 * Message packer configuration.
 */
export interface MessageUnpackerProps {
  /**
   * One or multiple DID resolver instances.
   */
  didResolver: DIDResolver | DIDResolver[]

  /**
   * One or multiple DID secrets resolver instances.
   */
  secretsResolver: DIDSecretsResolver | DIDSecretsResolver[]
}

// Defines consistency/trust checks for unpack
export interface UnpackOpts {
  /**
   * Automatically unwrap `forward` messages in `Rewrapping`
   * (https://identity.foundation/didcomm-messaging/spec/#rewrapping) mode.
   * Enabled by default.
   */
  unwrapRewrapping?: boolean

  /**
   * Check message is signed.
   * Disabled by default.
   */
  expectSigned?: boolean

  /**
   * Check message is authcrypted.
   * Disabled by default.
   */
  expectAuthcrypted?: boolean

  /**
   * Check message is anoncrypted.
   * Disabled by default.
   */
  expectAnoncrypted?: boolean

  /**
   * Check message can be decripted by all available keys. If
   * disabled decryption by any key will be required.
   * Disabled by default.
   */
  expectDecryptableByAllKeys?: boolean
}

/**
 * Additional message metadata related to trust
 * accumulated during unpacking
 */
export interface UnpackMetadata {
  /**
   * `from` determined on authcrypt layer.
   */
  authcrypt_from: string | undefined

  /**
   * `from` determined on sign layer.
   */
  sign_from: string | undefined

  /**
   * Recepients that were verified by actual encryption.
   */
  verified_to: [string] | undefined

  /**
   * Was original message rewrapped to forward message or not.
   */
  rewrapped: boolean
}

export type UnpackResult = [message: Message, metadata: UnpackMetadata]
