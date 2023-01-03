import { arrayFromString } from '../utils/line'
import { Field } from './Field'

export class ArrayField extends Field {
  options: string[] = []

  constructor(name: string, lineIndex: string) {
    super(name, lineIndex)
  }

  addOption(option: string) {
    this.options = [...new Set([...this.options, option])]
  }

  removeOption(option: string) {
    this.options = this.options.filter((selectedOption) => selectedOption !== option)
  }

  _parse(str: string) {
    this.options = arrayFromString(str)
  }

  _toString() {
    return `${this.name} = [${this.options.map((option) => `"${option}"`).join(', ')}]`
  }
}
