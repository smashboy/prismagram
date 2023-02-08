import { Enum } from '../blocks'
import { Field } from './Field'

export class EnumField extends Field {
  value = ''

  readonly _enum: Enum

  constructor(name: string, _enum: Enum) {
    super(name)

    this.value = name
    this._enum = _enum
  }

  setValue(value: string) {
    this.value = value
  }

  _toString() {
    return this.value
  }
}
