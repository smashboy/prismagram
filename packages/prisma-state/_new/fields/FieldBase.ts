import { TopLevelFieldData } from '../types'

export abstract class FieldBase<T extends TopLevelFieldData> {
  protected data: T

  constructor(data: T) {
    this.data = data
  }

  get name() {
    return this.data.name
  }

  get blockId() {
    return this.data.blockId
  }

  _data() {
    return structuredClone(this.data)
  }
}
