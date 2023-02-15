import { Enum } from '../blocks'
import { Field } from './Field'

export class EnumField extends Field {
  value = ''

  constructor(name: string, block: Enum) {
    super(name, block)

    this.value = name
  }

  setValue(value: string) {
    this.value = value
  }

  _toString() {
    return this.value
  }

  _clone(block: Enum) {
    return new EnumField(this.name, block)
  }
}
