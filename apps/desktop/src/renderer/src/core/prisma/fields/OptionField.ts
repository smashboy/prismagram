import { stripValue } from '../utils/line'
import { Field } from './Field'

export class OptionField extends Field {
  value = ''

  constructor(name: string, lineIndex: number) {
    super(name, lineIndex)
  }

  setValue(value: string) {
    this.value = value
  }

  _parse(value: string) {
    this.value = stripValue(value)
  }

  _toString() {
    return `${this.name} = "${this.value}"`
  }
}
