import { Datasource, Generator } from '../blocks'
import { cleanupStr } from '../utils/string'
import { Field } from './Field'

export class OptionField extends Field {
  value = ''

  constructor(name: string, block: Datasource | Generator) {
    super(name, block)
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
}
