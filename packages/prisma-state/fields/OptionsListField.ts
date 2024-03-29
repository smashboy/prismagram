import { Datasource, Generator } from '../blocks'
import { cleanupStr } from '../utils/string'
import { Field } from './Field'

export class OptionsListField extends Field {
  private readonly _options: Set<string>

  constructor(name: string, block: Datasource | Generator, initialValues = new Set<string>()) {
    super(name, block)

    this._options = initialValues
  }

  get values() {
    return [...this._options.values()]
  }

  addValues(options: string[]) {
    options.forEach((option) => this._options.add(option))
  }

  addValue(option: string) {
    this._options.add(option)
  }

  removeValues(option: string) {
    this._options.delete(option)
  }

  reset() {
    this._options.clear()
  }

  _parse(args: string[]) {
    for (const option of args) {
      this._options.add(cleanupStr(option))
    }
  }

  _toString() {
    return `${this.name} = [${[...this._options.values()]
      .map((option) => `"${option}"`)
      .join(', ')}]`
  }
}
