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

  _toString() {
    return `${this.type}()`
  }
}
