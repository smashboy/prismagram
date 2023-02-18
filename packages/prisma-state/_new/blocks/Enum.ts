import { Enum as AstEnum } from '@mrleebo/prisma-ast/src/getSchema'
import { BlockBase } from './BlockBase'
import {
  EnumData,
  EnumFieldData,
  EnumModelFieldData,
  ModelData,
  PrismaSchemaStateInstance,
  Writeable
} from '../types'
import { EnumField } from '../fields'

interface EnumReference {
  model: Writeable<ModelData>
  fields: Writeable<EnumModelFieldData>[]
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
      fields.forEach((data) => (data.type = name))
    }
    super.setName(name)
  }

  addOption(name: string) {
    this.data.fields.set(name, new EnumField(name, this.name)._data())
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
