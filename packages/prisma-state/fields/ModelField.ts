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

  private readonly model: Model

  constructor(name: string, lineIndex: string, type: ModelFieldType, model: Model) {
    super(name, lineIndex)
    this.type = type
    this.model = model
  }

  setName(name: string) {
    // TODO: handle auto renaming in references
    this.name = name
  }

  setType(type: ModelFieldType) {
    this.type = type
    this.modifier = null
    // this.attributes.clear()
  }

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
