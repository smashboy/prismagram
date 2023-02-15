import { Datasource, Generator } from '../blocks'
import { cleanupStr } from '../utils/string'
import { Field } from './Field'

export class OptionField extends Field {
  value: string

  constructor(name: string, block: Datasource | Generator, value = '') {
    super(name, block)

    this.value = value
  }

  setValue(value: string) {
    this.value = value
  }

  _parse(value: string) {
    this.value = cleanupStr(value)
  }

  _toString() {
    return `${this.name} = "${this.value}"`
  }

  _clone(block: Datasource | Generator) {
    return new OptionField(this.name, block, this.value)
  }
}
