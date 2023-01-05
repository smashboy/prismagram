import { EnumField } from '../fields/EnumField'
import { PrismaSchemaState } from '../PrismaSchemaState'
import { Block } from './Block'

export class Enum extends Block<EnumField> {
  constructor(id: string, state: PrismaSchemaState) {
    super(id, 'enum', state)
  }

  _parseLine(line: string, lineIndex: string) {
    const name = line.trim()

    this.addField(name, new EnumField(name, lineIndex))
  }
}
