export type AttributeFunctionType =
  | 'auto'
  | 'autoincrement'
  | 'sequence'
  | 'cuid'
  | 'uuid'
  | 'now'
  | 'dbgenerated'

export const attributeFunctionsList = [
  'auto',
  'autoincrement',
  'cuid',
  'dbgenerated',
  'now',
  'sequence',
  'uuid'
].map((func) => `${func}()`) as `${AttributeFunctionType}()`[]

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
}
