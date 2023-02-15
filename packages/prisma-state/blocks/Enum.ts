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
  constructor(name: string, state: PrismaSchemaState) {
    super(name, 'enum', state)
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

  addOption(name: string) {
    this.addField(name, new EnumField(name, this))
  }

  _parse(list: AstEnum['enumerators']) {
    if (!list) return

    for (const item of list) {
      if (item.type !== 'enumerator') continue

      const { name } = item

      this.addField(name, new EnumField(name, this))
    }
  }

  _clone(state: PrismaSchemaState) {
    const cloned = new Enum(this.name, state)

    this.fieldsMap.forEach((field) => cloned.addField(field.name, field._clone(cloned)))

    return cloned
  }
}
