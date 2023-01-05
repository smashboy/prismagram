import { AttributeFunction } from './AttributeFunction'

export type AttributePrefix = '@' | '@@'

export type ArgumentValue =
  | string
  | number
  | boolean
  | Array<string | number | boolean>
  | AttributeFunction

export class Attribute<T extends string, AK = string> {
  readonly arguments = new Map<AK, ArgumentValue>()
  private readonly _prefix: AttributePrefix
  readonly type: T

  constructor(type: T, prefix: AttributePrefix) {
    this.type = type
    this._prefix = prefix
  }

  _toString() {
    return `${this._prefix}${this.type}${this.arguments.size > 0 ? '()' : ''}`
  }

  protected setArgument(key: AK, value: ArgumentValue) {
    this.arguments.set(key, value)
  }

  removeArgument(key: AK) {
    this.arguments.delete(key)
  }
}
