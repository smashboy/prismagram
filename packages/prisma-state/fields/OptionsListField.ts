import { cleanupStr } from '../utils/string'
import { Field } from './Field'

export class OptionsListField extends Field {
  readonly options = new Set<string>()

  constructor(name: string) {
    super(name)
  }

  addOption(option: string) {
    this.options.add(option)
  }

  removeOption(option: string) {
    this.options.delete(option)
  }

  _parse(args: string[]) {
    for (const option of args) {
      this.options.add(cleanupStr(option))
    }
  }

  _toString() {
    return `${this.name} = [${[...this.options].map((option) => `"${option}"`).join(', ')}]`
  }
}
