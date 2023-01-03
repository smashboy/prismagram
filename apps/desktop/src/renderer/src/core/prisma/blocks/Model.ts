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
  | StringField
> {}
