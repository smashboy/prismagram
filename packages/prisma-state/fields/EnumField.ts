import { Field } from './Field'

export class EnumField extends Field {
  value = ''

  constructor(name: string) {
    super(name)

    this.value = name
  }

  _toString() {
    return this.value
  }
}
