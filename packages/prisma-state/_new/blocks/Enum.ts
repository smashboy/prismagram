import { Enum as AstEnum } from '@mrleebo/prisma-ast/src/getSchema'
import { BlockBase } from './BlockBase'
import { EnumData, PrismaSchemaStateInstance } from '../types'
import { EnumField } from '../fields'

export class Enum extends BlockBase<EnumData> {
  constructor(
    name: string,
    state: PrismaSchemaStateInstance,
    enumItem: EnumData = { name, type: 'enum', fields: new Map() }
  ) {
    super(enumItem, state)
  }

  _parse(list: AstEnum['enumerators'] = []) {
    for (const item of list) {
      if (item.type !== 'enumerator') continue

      const { name } = item

      const field = new EnumField(name, this.name)

      this.fields.set(name, field._data())
    }
  }
}
