import { arrayFromString } from '../utils/line'
import { Field } from './Field'

export class OptionsListField extends Field {
  readonly options = new Set<string>()

  constructor(name: string, lineIndex: string) {
    super(name, lineIndex)
  }

  addOption(option: string) {
    this.options.add(option)
  }

  removeOption(option: string) {
    this.options.delete(option)
  }

  _parse(str: string) {
    for (const option of arrayFromString(str)) {
      this.options.add(option)
    }
  }

  _toString() {
    return `${this.name} = [${[...this.options].map((option) => `"${option}"`).join(', ')}]`
  }
}
