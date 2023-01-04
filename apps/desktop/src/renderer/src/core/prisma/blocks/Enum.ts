import { EnumField } from '../fields/EnumField'
import { Block } from './Block'

export class Enum extends Block<EnumField> {
  constructor(id: string) {
    super(id, 'enum')
  }

  _parseLine(line: string, lineIndex: string) {
    const name = line.trim()

    this.addField(name, new EnumField(name, lineIndex))
  }
}
