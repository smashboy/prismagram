import type { Field as AstField } from '@mrleebo/prisma-ast'
import {
  IgnoreAttribute,
  MapAttribute,
  RelationAttribute,
  IdAttribute,
  DefaultAttribute,
  UniqueAttribute,
  UpdatedAtAttribute,
  FieldAttribute
} from '../attributes'
import { Model } from '../blocks'
import { scalarOptionsArray, ScalarTypeOption } from '../constants'

import { Field } from './Field'

type ModelFieldType = ScalarTypeOption | string

type FieldModifier = 'optional' | 'list' | null

const fieldAttributeMap = {
  id: IdAttribute,
  default: DefaultAttribute,
  updatedAt: UpdatedAtAttribute,
  ignore: IgnoreAttribute,
  relation: RelationAttribute,
  unique: UniqueAttribute,
  map: MapAttribute
}

export class ModelField<A = FieldAttribute> extends Field {
  type: ModelFieldType
  modifier: FieldModifier = null
  readonly attributes = new Map<string, A>()

  protected readonly model: Model

  constructor(name: string, type: ModelFieldType, model: Model) {
    super(name)
    this.type = type
    this.model = model
  }

  setName(name: string) {
    // TODO: handle auto renaming in references
    this.name = name
  }

  // setType(type: ModelFieldType) {
  //   this.type = type
  //   this.modifier = null
  //   // this.attributes.clear()
  // }

  setModifier(modifier: FieldModifier) {
    this.modifier = modifier
    // this.attributes.clear()
  }

  protected _isScalarType() {
    return scalarOptionsArray.indexOf(this.type as ScalarTypeOption) > -1
  }

  get displayType() {
    return `${this.type}${
      this.modifier === 'list' ? '[]' : this.modifier === 'optional' ? '?' : ''
    }`
  }

  _parse(field: AstField) {
    const { array = false, optional = false, attributes = [] } = field

    if (array) this.modifier = 'list'
    if (optional) this.modifier = 'optional'

    for (const { name, args = [] } of attributes) {
      const Attribute = fieldAttributeMap[name]

      if (Attribute) {
        const attribute = new Attribute()
        attribute._parseArgs(args)

        this.attributes.set(name, attribute)
      }
    }
  }
}