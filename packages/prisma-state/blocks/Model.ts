import { BlockAttribute } from '../attributes'
import { ScalarType, ScalarTypeOption } from '../constants'
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

const scalarFieldMap = {
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
  readonly attributes: BlockAttribute[] = []

  constructor(id: string, state: PrismaSchemaState) {
    super(id, 'model', state)
  }

  private createField(
    name: string,
    type: string,
    field: ScalarField | RelationField | EnumModelField,
    rest: string[]
  ) {
    field._parseModifier(type)
    field._parseAttributes(rest)
    this.addField(name, field)
  }

  _parseLine(line: string, lineIndex: string) {
    const [name, type, ...rest] = line
      .split(' ')
      .filter(Boolean)
      .map((str) => str.trim())

    const typeWithoutModifier = type.replace('[]', '').replace('?', '')

    const ScalarField = scalarFieldMap[typeWithoutModifier as ScalarTypeOption]

    if (ScalarField)
      return this.createField(name, type, new ScalarField(name, lineIndex, this), rest)

    const state = this.state

    if (state.modelIds.indexOf(typeWithoutModifier) > -1)
      return this.createField(name, type, new RelationField(name, lineIndex, this), rest)

    if (state.enumIds.indexOf(typeWithoutModifier) > -1)
      return this.createField(
        name,
        type,
        new EnumModelField(name, lineIndex, typeWithoutModifier, this),
        rest
      )
  }
}
