import { FieldBase } from './FieldBase'
import { EnumFieldData } from '../types'

export class EnumField extends FieldBase<EnumFieldData> {
  constructor(
    name: string,
    blockId: string,
    data: EnumFieldData = { name, blockId, type: 'enumOption' }
  ) {
    super(data)
  }

  get value() {
    return this.data.name
  }

  setValue(value: string) {
    this.data.name = value
  }

  static _toString(data: EnumFieldData) {
    return data.name
  }
}
