import { DIDResolver } from '../did'
import { Message } from '../message'
import { DIDSecretsResolver } from '../secrets'

/**
 * Provides message packing (authcrypt, anoncrypt, sign) helper.
 */
export class MessagePacker {
  /**
   * Construct message packer instance.
   * @param props configuration properties
   */
  constructor(props: MessagePackerProps) {}

  /**
   * Pack message using `authcrypt`
   * @param msg message to pack
   * @param opts packing options
   * @returns packed message
   */
  async authcrypt(msg: Message, opts?: AuthcryptOpts): Promise<string> {
    return 'authcrypt'
  }

  /**
   * Pack message using `anoncrypt`
   * @param msg message to pack
   * @param opts packing options
   * @returns packed message
   */
  async anoncrypt(msg: Message, opts?: AnoncryptOpts): Promise<string> {
    return 'anoncrypt'
  }

  /**
   * Pack message using `anoncrypt+sign`
   * @param msg message to pack
   * @param opts packing options
   * @returns packed message
   */
  async anoncrypt_signed(msg: Message, opts?: AnoncryptSignedOpts): Promise<string> {
    return 'anoncrypt'
  }

  /**
   * Pack message using `sign`
   * @param msg message to pack
   * @param opts packing options
   * @returns packed message
   */
  async sign(msg: Message, opts?: SignOpts): Promise<string> {
    return 'sign'
  }
}

/**
 * Message packer configuration.
 */
export interface MessagePackerProps {
  /**
   * One or multiple DID resolver instances.
   */
  didResolver: DIDResolver | DIDResolver[]

  /**
   * One or multiple DID secrets resolver instances.
   */
  secretsResolver: DIDSecretsResolver | DIDSecretsResolver[]
}

/**
 * Authcrypt packing options
 */
export interface AuthcryptOpts {
  /**
   * Allows use `from` different than in plain message.
   */
  from?: string

  /**
   * Allows use `to` different than in plain message.
   */
  to?: string | string[]

  /**
   * Allows select alogrythms. By defailt ECDH_1PU+A256KW+AES_CBC_HMAC_SHA2
   * will be used.
   */
  alg?: AuthcryptAlg
}

/**
 * Anoncrypt packing options
 */
export interface AnoncryptOpts {
  /**
   * Allows use `to` different than in plain message.
   */
  to?: string | string[]

  /**
   * Allows select alogrythms. By defailt ECDH_1PU+A256KW+AES_CBC_HMAC_SHA2
   * will be used.
   */
  alg?: AnoncryptAlg
}

/**
 * Anoncrypt+Sign packing options
 */
export interface AnoncryptSignedOpts {
  /**
   * Allows use `from` different than in plain message.
   */
  from?: string

  /**
   * Allows use `to` different than in plain message.
   */
  to?: string | string[]

  /**
   * Allows select anoncrypt alogrythms. By defailt ECDH_ES_A256KW_XC20P
   * will be used.
   */
  anoncrypt_alg?: AnoncryptAlg

  /**
   * Allows select sign alogrythms. By defailt EdDSA
   * will be used.
   */
  sign_alg?: SignAlg
}

/**
 * Sign packing options
 */
export interface SignOpts {
  /**
   * Allows use `from` different than in plain message.
   */
  from?: string

  /**
   * Allows select sign alogrythms. By defailt EdDSA
   * will be used.
   */
  alg?: SignAlg
}

/**
 * Supported authcrypt algorythms
 */
export enum AuthcryptAlg {
  ECDH_1PU_A256KW_AES_CBC_HMAC_SHA2,
}

/**
 * Supported anoncrypt algorythms
 */
export enum AnoncryptAlg {
  ECDH_ES_A256KW_XC20P,
  ECDH_ES_A256KW_A256GCM,
  ECDH_ES_A256KW_A256CBC_HS512,
}

/**
 * Supported sign algorythms
 */
export enum SignAlg {
  EdDSA,
  ES256,
  ES256K,
}
