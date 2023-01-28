import { Enum as AstEnum } from '@mrleebo/prisma-ast/src/getSchema'
import { EnumField } from '../fields'
import { PrismaSchemaState } from '../PrismaSchemaState'
import { Block } from './Block'

export class Enum extends Block<EnumField> {
  constructor(id: string, state: PrismaSchemaState) {
    super(id, 'enum', state)
  }

  _parse(list: AstEnum['enumerators']) {
    for (const item of list) {
      if (item.type !== 'enumerator') continue

      const { name } = item

      this.addField(name, new EnumField(name))
    }
  }
}
