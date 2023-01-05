import { scalarOptionsArray, ScalarType } from '@shared/common/configs/prisma'
import { FieldAttribute } from '../attributes/FieldAttribute'
import { DefaultAttribute } from '../attributes/fieldAttributes/DefaultAttribute'
import { IdAttribute } from '../attributes/fieldAttributes/IdAttribute'
// import { FieldAttribute } from '../attributes/FieldAttribute'
import { Field } from './Field'

type ModelFieldType = ScalarType | string

const fieldAttributeMap = {
  id: IdAttribute,
  default: DefaultAttribute
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
    return scalarOptionsArray.includes(this.type as ScalarType)
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
    const currentFieldAttribute: A | null = null

    for (const str of substrings) {
      if (str.startsWith('@')) {
        let name = ''
        let hasArguments = false

        if (str.indexOf('(') > -1) {
          name = str.substring(str.indexOf('@') + 1, str.indexOf('('))
          hasArguments = true
        } else {
          name = str.replace('@', '')
        }

        if (fieldAttributeMap[name]) {
          const attr = new fieldAttributeMap[name]()

          if (!hasArguments) {
            this.attributes.set(name, attr)
            continue
          }

          if (hasArguments) {
            if (attr instanceof DefaultAttribute) {
              attr._parse(str)
              this.attributes.set(name, attr)
            }
          }
        }
      }
    }
  }
}
