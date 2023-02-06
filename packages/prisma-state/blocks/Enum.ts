import { Enum as AstEnum } from '@mrleebo/prisma-ast/src/getSchema'
import { EnumField, EnumModelField } from '../fields'
import { PrismaSchemaState } from '../PrismaSchemaState'
import { Block } from './Block'
import { Model } from './Model'

interface EnumReference {
  model: Model
  fields: EnumModelField[]
}

export class Enum extends Block<EnumField> {
  constructor(id: string, state: PrismaSchemaState) {
    super(id, 'enum', state)
  }

  getReferences() {
    const references: Array<EnumReference> = []

    for (const model of this.state.models.values()) {
      const ref: EnumReference = { model, fields: [] }

      for (const field of model.fields) {
        if (field.type === this.name) {
          ref.fields.push(field as EnumModelField)
        }
      }

      if (ref.fields.length > 0) references.push(ref)
    }

    return references
  }

  setName(name: string) {
    for (const { fields } of this.getReferences()) {
      fields.forEach((field) => field.setType(name))
    }
    super.setName(name)
  }

  _parse(list: AstEnum['enumerators']) {
    for (const item of list) {
      if (item.type !== 'enumerator') continue

      const { name } = item

      this.addField(name, new EnumField(name))
    }
  }
}
