import { scalarOptionsArray, ScalarType } from '@shared/common/configs/prisma'
import { FieldAttribute } from '../attributes/FieldAttribute'
import { DefaultAttribute } from '../attributes/fieldAttributes/DefaultAttribute'
import { IdAttribute } from '../attributes/fieldAttributes/IdAttribute'
import { IgnoreAttribute } from '../attributes/fieldAttributes/IgnoreAttribute'
import { MapAttribute } from '../attributes/fieldAttributes/MapAttribute'
import { RelationAttribute } from '../attributes/fieldAttributes/RelationAttribute'
import { UniqueAttribute } from '../attributes/fieldAttributes/UniqueAttribute'
import { UpdatedAtAttribute } from '../attributes/fieldAttributes/UpdatedAtAttribute'
import { Field } from './Field'

type ModelFieldType = ScalarType | string

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
  modifier: 'optional' | 'list' | null = null
  readonly attributes = new Map<string, A>()

  constructor(name: string, lineIndex: string, type: ModelFieldType) {
    super(name, lineIndex)
    this.type = type
  }

  protected _isScalarType() {
    return scalarOptionsArray.indexOf(this.type as ScalarType) > -1
  }

  get displayType() {
    return `${this.type}${
      this.modifier === 'list' ? '[]' : this.modifier === 'optional' ? '?' : ''
    }`
  }

  _parseModifier(type: string) {
    if (type.endsWith('[]')) {
      this.modifier = 'list'
      return
    }

    if (type.endsWith('?')) {
      this.modifier = 'optional'
      return
    }

    this.modifier = null
  }

  _parseAttributes(substrings: string[]) {
    const attributeStrings = substrings
      .join(' ')
      .split('@')
      .filter(Boolean)
      .map((str) => str.trim())

    if (attributeStrings.length === 0) return

    for (const attributeStr of attributeStrings) {
      const bracketIndex = attributeStr.indexOf('(')
      if (bracketIndex > -1) {
        const name = attributeStr.substring(0, bracketIndex)

        if (fieldAttributeMap[name]) {
          const attr = new fieldAttributeMap[name](this)
          const args = attributeStr.substring(bracketIndex + 1, attributeStr.lastIndexOf(')'))

          attr._parseArgs(args)
          this.attributes.set(name, attr)

          continue
        }
      }

      const name = attributeStr

      if (fieldAttributeMap[name]) {
        const attr = new fieldAttributeMap[name](this)
        this.attributes.set(name, attr)
      }
    }
  }
}
