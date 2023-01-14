import type { Model as AstModel } from '@mrleebo/prisma-ast'
import { ScalarType } from '../constants'
import {
  StringField,
  JsonField,
  IntField,
  FloatField,
  DecimalField,
  DateTimeField,
  BytesField,
  BooleanField,
  BigIntField,
  RelationField,
  EnumModelField,
  type ScalarField
} from '../fields'
import { PrismaSchemaState } from '../PrismaSchemaState'
import { Block } from './Block'

const ScalarFieldMap = {
  [ScalarType.STRING]: StringField,
  [ScalarType.INT]: IntField,
  [ScalarType.BOOLEAN]: BooleanField,
  [ScalarType.DATE_TIME]: DateTimeField,
  [ScalarType.FLOAT]: FloatField,
  [ScalarType.DECIMAL]: DecimalField,
  [ScalarType.BIG_INT]: BigIntField,
  [ScalarType.JSON]: JsonField,
  [ScalarType.BYTES]: BytesField
}

export class Model extends Block<ScalarField | RelationField> {
  constructor(name: string, state: PrismaSchemaState) {
    super(name, 'model', state)
  }

  _parse(model: AstModel) {
    for (const prop of model.properties) {
      if (prop.type === 'field') {
        const { fieldType, name } = prop
        const ScalarField = ScalarFieldMap[fieldType as unknown]

        if (ScalarField) {
          const scalarField = new ScalarField(name, this)
          scalarField._parse(prop)
          this.fields.set(name, scalarField)

          continue
        }

        if (this.state.modelIds.indexOf(fieldType as string) > -1) {
          const relationField = new RelationField(name, fieldType as string, this)
          relationField._parse(prop)
          this.fields.set(name, relationField)

          continue
        }

        if (this.state.enumIds.indexOf(fieldType as string) > -1) {
          const enumField = new EnumModelField(name, fieldType as string, this)
          enumField._parse(prop)
          this.fields.set(name, enumField)
        }

        continue
      }

      // if (prop.type === 'attribute') {

      // }
    }
  }
}
