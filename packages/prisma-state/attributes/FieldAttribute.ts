import { Attribute } from './Attribute'

export type FieldAttributeType =
  | 'id'
  | 'default'
  | 'unique'
  | 'map'
  | 'relation'
  | 'updatedAt'
  | 'ignore'

// TODO: fix circular field type
export class FieldAttribute<F = unknown, AK = string> extends Attribute<FieldAttributeType, AK> {
  protected readonly field: F

  constructor(type: FieldAttributeType, field: F) {
    super(type, '@')
    this.field = field
  }
}
