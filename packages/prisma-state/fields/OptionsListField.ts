import { cleanupStr } from '../utils/string'
import { Field } from './Field'

export class OptionsListField extends Field {
  private readonly _options = new Set<string>()

  constructor(name: string) {
    super(name)
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
