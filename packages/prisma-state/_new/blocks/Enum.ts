import { Enum as AstEnum } from '@mrleebo/prisma-ast/src/getSchema'
import { BlockBase } from './BlockBase'
import {
  EnumData,
  EnumFieldData,
  EnumModelFieldData,
  ModelData,
  PrismaSchemaStateInstance
} from '../types'
import { EnumField, EnumModelField } from '../fields'

interface EnumReference {
  model: ModelData
  fields: EnumModelFieldData[]
}

export class Enum extends BlockBase<EnumData, EnumFieldData> {
  constructor(
    name: string,
    state: PrismaSchemaStateInstance,
    enumItem: EnumData = { name, type: 'enum', fields: new Map() }
  ) {
    super(enumItem, state)
  }

  getReferences() {
    const references: Array<EnumReference> = []

    for (const model of this.state.models.values()) {
      const ref: EnumReference = { model, fields: [] }

      for (const field of model.fields.values()) {
        if (field.type === this.name) {
          ref.fields.push(field as EnumModelFieldData)
        }
      }

      if (ref.fields.length > 0) references.push(ref)
    }

    return references
  }

  setName(name: string) {
    for (const { fields } of this.getReferences()) {
      fields.forEach((data) => {
        const field = new EnumModelField(data.name, data.type, data.blockId, data)
        field
      })
    }
    super.setName(name)
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
