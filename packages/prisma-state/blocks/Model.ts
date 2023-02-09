import type { Model as AstModel } from '@mrleebo/prisma-ast/src/getSchema'
import {
  BlockAttribute,
  IdBlockAttribute,
  IgnoreBlockAttribute,
  IndexBlockAttribute,
  MapBlockAttribute,
  UniqueBlockAttribute
} from '../attributes'
import { RelationField, type ScalarField } from '../fields'
import { PrismaSchemaState } from '../PrismaSchemaState'
import { createFieldFromType } from '../utils/field'
import { Block } from './Block'

const attributesMap = {
  id: IdBlockAttribute,
  ignore: IgnoreBlockAttribute,
  index: IndexBlockAttribute,
  map: MapBlockAttribute,
  unique: UniqueBlockAttribute
}

interface ModelReference {
  model: Model
  fields: RelationField[]
}

export class Model<A = BlockAttribute> extends Block<ScalarField | RelationField> {
  readonly attributes = new Map<string, A>()

  constructor(name: string, state: PrismaSchemaState) {
    super(name, 'model', state)
  }

  getReferences() {
    const references: Array<ModelReference> = []

    for (const model of this.state.models.values()) {
      const ref: ModelReference = { model, fields: [] }

      for (const field of model.fields) {
        if (field.type === this.name) {
          ref.fields.push(field as RelationField)
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

  _parse(model: AstModel) {
    const props = model?.properties || []

    for (const prop of props) {
      if (prop.type === 'field') {
        const { fieldType, name } = prop
        const field = createFieldFromType(
          name,
          fieldType as string,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this,
          this.state.enumIds,
          this.state.modelIds
        )

        if (field) {
          field._parse(prop)
          this.fieldsMap.set(name, field)
        }
      }

      if (prop.type === 'attribute') {
        const { name, args } = prop

        const Attribute = attributesMap[name as keyof typeof attributesMap]

        if (Attribute) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const attribute = new Attribute(this)
          attribute._parseArgs(args)

          this.attributes.set(name, attribute as unknown as A)
        }
      }
    }

    if (this.name === 'ProjectRoadmap') {
      console.log(model, this.attributes)
    }
  }

  _toString() {
    const blockstr = `
    ${super._toString().replace('}', '')}

    ${[...this.attributes.values()]
      .map((attr) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return attr._toString()
      })
      .join('\r\n')}
    }
  `

    if (this.name === 'ProjectRoadmap') {
      console.log({ blockstr })
    }

    return blockstr
  }
}
