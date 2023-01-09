import { EnumModelField } from './scalarFields/EnumModelField'
import { BigIntField } from './scalarFields/BigIntField'
import { BooleanField } from './scalarFields/BooleanField'
import { BytesField } from './scalarFields/BytesField'
import { DateTimeField } from './scalarFields/DateTimeField'
import { FloatField } from './scalarFields/FloatField'
import { IntField } from './scalarFields/IntField'
import { JsonField } from './scalarFields/JsonField'
import { StringField } from './scalarFields/StringField'
import { DecimalField } from './scalarFields/DecimalField'

export type ScalarField =
  | EnumModelField
  | BigIntField
  | BooleanField
  | DateTimeField
  | BytesField
  | FloatField
  | IntField
  | JsonField
  | StringField
  | DecimalField
