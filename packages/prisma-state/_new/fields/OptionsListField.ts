import { FieldBase } from './FieldBase'
import { OptionsListFieldData } from '../types'
import { cleanupStr } from '../../utils/string'

export class OptionsListField extends FieldBase<OptionsListFieldData> {
  constructor(
    name: string,
    blockId: string,
    data: OptionsListFieldData = {
      name,
      blockId,
      options: new Set(),
      type: 'list'
    }
  ) {
    super(data)
  }

  get values() {
    return [...this.data.options.values()]
  }

  addValues(options: string[]) {
    options.forEach((option) => this.data.options.add(option))
  }

  addValue(option: string) {
    this.data.options.add(option)
  }

  removeValues(option: string) {
    this.data.options.delete(option)
  }

  reset() {
    this.data.options.clear()
  }

  _parse(args: string[] = []) {
    args.forEach((arg) => this.data.options.add(cleanupStr(arg)))
  }

  static _toString(field: OptionsListFieldData) {
    return `${field.name} = [${[...field.options.values()]
      .map((option) => `"${option}"`)
      .join(', ')}]`
  }
}
