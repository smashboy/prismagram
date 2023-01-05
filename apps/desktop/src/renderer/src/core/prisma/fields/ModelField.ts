import { scalarOptionsArray, ScalarType } from '@shared/common/configs/prisma'
import { FieldAttribute } from '../attributes/FieldAttribute'
import { DefaultAttribute } from '../attributes/fieldAttributes/DefaultAttribute'
import { IdAttribute } from '../attributes/fieldAttributes/IdAttribute'
import { IgnoreAttribute } from '../attributes/fieldAttributes/IgnoreAttribute'
import { UpdatedAtAttribute } from '../attributes/fieldAttributes/UpdatedAtAttribute'
// import { FieldAttribute } from '../attributes/FieldAttribute'
import { Field } from './Field'

type ModelFieldType = ScalarType | string

const fieldAttributeMap = {
  id: IdAttribute,
  default: DefaultAttribute,
  updatedAt: UpdatedAtAttribute,
  ignore: IgnoreAttribute
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
    const attributeStrings = substrings.join(' ').split('@').filter(Boolean)

    if (attributeStrings.length === 0) return

    for (const attributeStr of attributeStrings) {
      if (attributeStr.indexOf('(') > -1) {
        continue
      }

      if (fieldAttributeMap[attributeStr]) {
        const attr = new fieldAttributeMap[attributeStr]()
        this.attributes.set(attributeStr, attr)
      }
    }

    // const currentFieldAttribute: A | null = null

    // if (substrings[0]?.startsWith('@')) console.log(substrings)

    // for (const str of substrings) {
    //   if (str.startsWith('@')) {
    //     let name = ''
    //     let hasArguments = false

    //     if (str.indexOf('(') > -1) {
    //       name = str.substring(str.indexOf('@') + 1, str.indexOf('('))
    //       hasArguments = true
    //     } else {
    //       name = str.replace('@', '')
    //     }

    //     if (fieldAttributeMap[name]) {
    //       const attr = new fieldAttributeMap[name]()

    //       if (!hasArguments) {
    //         this.attributes.set(name, attr)
    //         continue
    //       }

    //       // if (hasArguments) {

    //       // }
    //     }
    //   }
    // }
  }
}
