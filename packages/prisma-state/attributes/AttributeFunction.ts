export type AttributeFunctionType =
  | 'auto'
  | 'autoincrement'
  | 'sequence'
  | 'cuid'
  | 'uuid'
  | 'now'
  | 'dbgenerated'

export class AttributeFunction {
  readonly type: AttributeFunctionType

  constructor(type: AttributeFunctionType) {
    this.type = type
  }

  get displayType() {
    return `${this.type}()`
  }

  _toString() {
    return `${this.type}()`
  }

  _clone() {
    return new AttributeFunction(this.type)
  }
}
