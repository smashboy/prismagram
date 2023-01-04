export type AttributePrefix = '@' | '@@'

export type ArgumentValue = string | number | boolean | Array<string | number | boolean>

export class Attribute<T extends string, AK = string> {
  readonly arguments = new Map<AK, ArgumentValue>()
  readonly prefix: AttributePrefix
  readonly type: T

  constructor(type: T, prefix: AttributePrefix) {
    this.type = type
    this.prefix = prefix
  }

  _toString() {
    return `${this.prefix}${this.type}${this.arguments.size > 0 ? '()' : ''}`
  }

  protected setArgument(key: AK, value: ArgumentValue) {
    this.arguments.set(key, value)
  }

  removeArgument(key: AK) {
    this.arguments.delete(key)
  }
}
