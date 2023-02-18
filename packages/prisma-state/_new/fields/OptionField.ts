import { FieldBase } from './FieldBase'
import { OptionFieldData } from '../types'
import { cleanupStr } from '../../utils/string'

export class OptionField extends FieldBase<OptionFieldData> {
  constructor(
    name: string,
    blockId: string,
    data = {
      name,
      blockId,
      value: '',
      type: 'option' as const
    }
  ) {
    super(data)
  }

  get value() {
    return this.data.value
  }

  setValue(value: string) {
    this.data.value = value
  }

  _parse(value: string) {
    this.data.value = cleanupStr(value)
  }

  static _toString(field: OptionFieldData) {
    return `${field.name} = "${field.value}"`
  }
}
