import { Field as AstField } from '@mrleebo/prisma-ast/src/getSchema'
import { ScalarTypeOption } from '../../constants'
import {
  AttributeBase,
  DefaultAttribute,
  IdAttribute,
  IgnoreAttribute,
  MapAttribute,
  RelationAttribute,
  UniqueAttribute,
  UpdatedAtAttribute
} from '../attributes'
import { EnumModelFieldData, RelationFieldData, ScalarFieldData } from '../types'
import { EnumModelField } from './EnumModelField'
import { FieldBase } from './FieldBase'
import { RelationField } from './RelationField'
import { ScalarField } from './ScalarField'

export abstract class ModelFieldBase<
  F extends RelationFieldData | ScalarFieldData | EnumModelFieldData
> extends FieldBase<F> {
  static fieldAttributeMap = {
    id: IdAttribute,
    default: DefaultAttribute,
    updatedAt: UpdatedAtAttribute,
    ignore: IgnoreAttribute,
    relation: RelationAttribute,
    unique: UniqueAttribute,
    map: MapAttribute
  }

  get type() {
    return this.data.type
  }

  get attributes() {
    return this.data.attributes
  }

  get displayType() {
    const { type, modifier } = this.data

    return `${type}${modifier === 'list' ? '[]' : modifier === 'optional' ? '?' : ''}`
  }

  _parse(data: AstField) {
    const { array = false, optional = false, attributes = [] } = data

    const field = this.data

    if (array) field.modifier = 'list'
    if (optional) field.modifier = 'optional'

    for (const { name, args = [] } of attributes) {
      const Attribute =
        ModelFieldBase.fieldAttributeMap[name as keyof typeof ModelFieldBase.fieldAttributeMap]

      if (Attribute) {
        const attribute = new Attribute()
        attribute._parse(args)

        this.attributes.set(name, attribute._data())
      }
    }
  }

  static _toString(field: RelationField | ScalarField | EnumModelField, displayType: string) {
    return `${field.name} ${displayType} ${[...field.attributes.values()]
      .map((attr) => AttributeBase._toString('@', attr))
      .join(' ')}`
  }
}
