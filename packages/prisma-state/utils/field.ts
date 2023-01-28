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
  ModelField
} from '../fields'
import { Model } from '../blocks'
import { ScalarType, ScalarTypeOption } from '../constants'

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

export const createScalarFieldFromType = (
  name: string,
  type: string,
  model: Model
): ModelField | undefined => {
  const ScalarField = ScalarFieldMap[type as ScalarTypeOption]

  if (ScalarField) return new ScalarField(name, model)

  return void 0
}

export const createFieldFromType = (
  name: string,
  type: string,
  model: Model,
  enumIds: string[],
  modelIds: string[]
) => {
  const scalarField = createScalarFieldFromType(name, type, model)

  if (scalarField) return scalarField

  if (enumIds.indexOf(type) > -1) return new EnumModelField(name, type, model)

  if (modelIds.indexOf(type) > -1) return new RelationField(name, type, model)

  return void 0
}
