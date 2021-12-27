/**
 * Wrapper for plain message. Provides helpers for message building and parsing.
 */
export class Message {
  /**
   * Message building helper
   * @param props message properties
   * @returns composed message instance
   * @throws DIDCommError
   */
  static build(_props: MessageProps): Message {
    return new Message()
  }

  /**
   * Message parsing helper
   * @param plaintext message as plaintext
   * @returns parsed message instance
   * @throws DIDCommError
   */
  static parse(plaintext: string): Message {
    return new Message()
  }

  /**
   * @returns message `from` header
   */
  from(): string {
    return 'from'
  }

  /**
   * @returns message `to` header
   */
  to(): [string] {
    return ['to']
  }

  /**
   * @returns message `created_at` header
   */
  created_at(): Date | undefined {
    return undefined
  }

  /**
   * @returns message `expires_at` header
   */
  expires_at(): Date | undefined {
    return undefined
  }

  /**
   * @returns all message headers
   */
  headers(): { [key: string]: object } {
    return {}
  }

  /**
   * @returns message body
   */
  body(): object {
    return {}
  }

  /**
   * @returns message attachments headers
   */
  attachments(): AttachmentProps[] {
    return []
  }

  /**
   * @returns serialised message
   */
  as_plain(): string {
    return 'plain'
  }
}

/**
 * Message properties.
 */
export interface MessageProps {
  /**
   * Message id. Must be unique to the sender.
   */
  id: string

  /**
   * Sender identifier. The from attribute MUST be a string that is a valid DID
   * or DID URL (without the fragment component) which identifies the sender of the message.
   */
  from?: string

  /**
   * Identifier(s) for recipients. MUST be an array of strings where each element
   * is a valid DID or DID URL (without the fragment component) that identifies a member
   * of the message’s intended audience.
   */
  to?: string | string[]

  /**
   * Message type attribute value MUST be a valid Message Type URI,
   * that when resolved gives human readable information about the message.
   * The attribute’s value also informs the content of the message,
   * or example the presence of other attributes and how they should be processed.
   */
  type: string

  /**
   * List of custom message headers.
   */
  custom_headers?: [string, string | object][]

  /**
   * The created_time attribute is used for the sender to express when they created the message.
   */
  created_time?: Date

  /**
   * The expires_time attribute is used for the sender to express when they consider the message to be expired.
   */
  expires_time?: Date

  /**
   * Applciatiom-specific message body
   */
  body: object

  /** List of attachments */
  attachements: AttachmentProps[]
}

/**
 * Attachment properties.
 */
export interface AttachmentProps {
  /**
   * Identifies attached content within the scope of a given message.
   * Recommended on appended attachment descriptors. Possible but generally unused
   * on embedded attachment descriptors. Never required if no references to the attachment
   * exist; if omitted, then there is no way to refer to the attachment later in the thread,
   * in error messages, and so forth. Because id is used to compose URIs, it is recommended
   * that this name be brief and avoid spaces and other characters that require URI escaping.
   */
  id?: string

  /**
   * A human-readable description of the content.
   */
  description?: string

  /**
   * A hint about the name that might be used if this attachment is persisted as a file.
   * It is not required, and need not be unique. If this field is present and mime-type is not,
   * the extension on the filename may be used to infer a MIME type.
   */
  filename?: string

  /**
   * Describes the MIME type of the attached content.
   */
  media_type?: string

  /**
   * Describes the format of the attachment if the mime_type is not sufficient.
   */
  format?: string

  /**
   * A hint about when the content in this attachment was last modified.
   */
  lastmod_time?: Date

  /**
   * Mostly relevant when content is included by reference instead of by value.
   * Lets the receiver guess how expensive it will be, in time, bandwidth, and storage,
   * to fully fetch the attachment.
   */
  byte_count?: Number

  /**
   * A JSON object that gives access to the actual content of the attachment.
   * Can be based on base64, json or external links.
   */
  data: Base64AttachmentDataProps | JsonAttachmentDataProps | LinksAttachmentDataProps
}

/**
 * Attachment data props for attachement in base64 format.
 */
export interface Base64AttachmentDataProps {
  /**
   * Base64-encoded data, when representing arbitrary content inline.
   */
  base64: string

  /**
   * A JSON Web Signature over the content of the attachment.
   */
  jws?: string

  /**
   * The hash of the content encoded in multi-hash format. Used as an integrity check for the attachment.
   */
  hash?: string
}

/**
 * Attachment data props for attachement in JSON format.
 */
export interface JsonAttachmentDataProps {
  /**
   * Directly embedded JSON data.
   */
  json: string

  /**
   * A JSON Web Signature over the content of the attachment.
   */
  jws?: string

  /**
   * The hash of the content encoded in multi-hash format. Used as an integrity check for the attachment.
   */
  hash?: string
}

/**
 * Attachment data props for attachement referenced by links.
 */
export interface LinksAttachmentDataProps {
  /**
   * A list of one or more locations at which the content may be fetched.
   */
  links: string[]

  /**
   * A JSON Web Signature over the content of the attachment.
   */
  jws?: string

  /**
   * The hash of the content encoded in multi-hash format. Used as an integrity check for the attachment.
   * MUST be used if the data is referenced via the links data attribute.
   */
  hash: string
}
