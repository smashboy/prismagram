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

  _parseLine(line: string, lineIndex: string) {
    const [name, type, ...rest] = line
      .split(' ')
      .filter(Boolean)
      .map((str) => str.trim())

    const typeWithoutModifier = type.replace('[]', '').replace('?', '')

    const ScalarField = scalarFieldMap[typeWithoutModifier as ScalarTypeOption]

    if (ScalarField) {
      const scalarField = new ScalarField(name, lineIndex, this)
      scalarField._parseModifier(type)
      scalarField._parseAttributes(rest)
      this.addField(name, scalarField)
      return
    }

    if (this.state.modelIds.indexOf(typeWithoutModifier) > -1) {
      const relationField = new RelationField(name, lineIndex, this)
      relationField._parseAttributes(rest)
      relationField._parseModifier(type)
      this.addField(name, relationField)
      return
    }

    if (this.state.enumIds.indexOf(typeWithoutModifier) > -1) {
      const enumField = new EnumModelField(name, lineIndex, typeWithoutModifier, this)
      enumField._parseAttributes(rest)
      enumField._parseModifier(type)
      this.addField(name, enumField)
      return
    }
  }
}
