import type { Model as AstModel } from '@mrleebo/prisma-ast/src/getSchema'
import { BlockBase } from './BlockBase'
import {
  EnumModelFieldData,
  ModelData,
  PrismaSchemaStateInstance,
  RelationFieldData,
  ScalarFieldData,
  Writeable
} from '../types'
import {
  IdBlockAttribute,
  IgnoreBlockAttribute,
  IndexBlockAttribute,
  MapBlockAttribute,
  UniqueBlockAttribute
} from '../attributes'
import { createFieldFromType } from '../utils/field'

interface ModelReference {
  model: Writeable<ModelData>
  fields: Writeable<RelationFieldData>[]
}

export class Model extends BlockBase<
  ModelData,
  ScalarFieldData | RelationFieldData | EnumModelFieldData
> {
  static attributesMap = {
    id: IdBlockAttribute,
    ignore: IgnoreBlockAttribute,
    index: IndexBlockAttribute,
    map: MapBlockAttribute,
    unique: UniqueBlockAttribute
  }

  constructor(
    name: string,
    state: PrismaSchemaStateInstance,
    model: ModelData = { name, type: 'model', fields: new Map(), attributes: new Map() }
  ) {
    super(model, state)
  }

  get attributes() {
    return this.data.attributes
  }

  getReferences() {
    const references: Array<ModelReference> = []

    for (const model of this.state.models.values()) {
      const ref: ModelReference = { model, fields: [] }

      for (const field of model.fields.values()) {
        if (field.type === this.name) {
          ref.fields.push(field as RelationFieldData)
        }
      }

      if (ref.fields.length > 0) references.push(ref)
    }

    return references
  }

  setName(name: string) {
    for (const { fields } of this.getReferences()) {
      fields.forEach((field) => (field.type = name))
    }
    super.setName(name)
  }

  _parse(model: AstModel) {
    const props = model?.properties || []

    for (const prop of props) {
      if (prop.type === 'field') {
        const { fieldType, name } = prop

        const field = createFieldFromType(
          name,
          fieldType as string,
          this.name,
          this.state.enumIds,
          this.state.modelIds
        )

        field._parse(prop)
        this.fields.set(name, field._data())

        continue
      }

      if (prop.type === 'attribute') {
        const { name, args } = prop

        const Attribute = Model.attributesMap[name as keyof typeof Model.attributesMap]

        if (Attribute) {
          const attr = new Attribute()
          attr._parse(args)
          this.data.attributes.set(name, attr._data())
        }
      }
    }
  }
}
