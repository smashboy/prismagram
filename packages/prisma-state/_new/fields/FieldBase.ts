import { TopLevelFieldData, Writeable } from '../types'

export abstract class FieldBase<
  T extends TopLevelFieldData,
  TW extends Writeable<T> = Writeable<T>
> {
  protected data: TW

  constructor(data: TW) {
    this.data = data
  }

  get name() {
    return this.data.name
  }

  get blockId() {
    return this.data.blockId
  }

  _data() {
    return structuredClone(this.data) as T
  }
}
