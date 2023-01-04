import { ScalarType } from '@shared/common/configs/prisma'
import { BigIntField } from '../fields/scalarFields/BigIntField'
import { BooleanField } from '../fields/scalarFields/BooleanField'
import { BytesField } from '../fields/scalarFields/BytesField'
import { DateTimeField } from '../fields/scalarFields/DateTimeField'
import { DecimalField } from '../fields/scalarFields/DecimalField'
import { FloatField } from '../fields/scalarFields/FloatField'
import { IntField } from '../fields/scalarFields/IntField'
import { JsonField } from '../fields/scalarFields/JsonField'
import { StringField } from '../fields/scalarFields/StringField'
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

export class Model extends Block<
  | BigIntField
  | StringField
  | BooleanField
  | BytesField
  | DateTimeField
  | DecimalField
  | FloatField
  | IntField
  | JsonField
> {
  constructor(id: string) {
    super(id, 'model')
  }

  _parseLine(line: string, lineIndex: string) {
    const [name, type] = line
      .split(' ')
      .filter(Boolean)
      .map((str) => str.trim())

    const typeWithoutModifier = type.replace('[]', '').replace('?', '')

    const ScalarField = scalarFieldMap[typeWithoutModifier as ScalarType]

    if (ScalarField) {
      const scalarField = new ScalarField(name, lineIndex)
      scalarField._parseModifier(type)

      this.addField(name, scalarField)
      return
    }
  }
}
