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

export class Model<A = BlockAttribute> extends Block<ScalarField | RelationField> {
  readonly attributes = new Map<string, A>()

  constructor(name: string, state: PrismaSchemaState) {
    super(name, 'model', state)
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
          this.fields.set(name, field)
        }
      }

      if (prop.type === 'attribute') {
        const { name, args } = prop
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const Attribute = attributesMap[name]

        if (Attribute) {
          const attribute = new Attribute(this)
          attribute._parseArgs(args)

          this.attributes.set(name, attribute)
        }
      }
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
    return blockstr
  }
}
