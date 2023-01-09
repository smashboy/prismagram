import { Field } from './Field'

export class EnumField extends Field {
  value = ''

  constructor(name: string, lineIndex: string) {
    super(name, lineIndex)

    this.value = name
  }

  _toString() {
    return this.value
  }
}
