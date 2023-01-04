import { Attribute } from './Attribute'

export type FieldAttributeType =
  | 'id'
  | 'default'
  | 'unique'
  | 'map'
  | 'relation'
  | 'updatedAt'
  | 'ignore'

export class FieldAttribute<AK = string> extends Attribute<FieldAttributeType, AK> {
  constructor(type: FieldAttributeType) {
    super(type, '@')
  }

  _toString() {
    return super._toString()
  }
}
