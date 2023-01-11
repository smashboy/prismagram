import { EnumField } from '../fields'
import { PrismaSchemaState } from '../PrismaSchemaState'
import { Block } from './Block'

export class Enum extends Block<EnumField> {
  constructor(id: string, state: PrismaSchemaState) {
    super(id, 'enum', state)
  }

  _parseLine(line: string, lineIndex: string) {
    const name = line.trim()

    if (line.startsWith('@@')) {
      this._parseAttributes(line)
      return
    }

    this.addField(name, new EnumField(name, lineIndex))
  }
}
