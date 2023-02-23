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
export abstract class FieldAttribute<F = unknown, AK = string> extends Attribute<
  FieldAttributeType,
  AK
> {
  protected readonly field: F

  constructor(type: FieldAttributeType, field: F, inialValues?: Map<string, unknown>) {
    super(type, '@', inialValues)
    this.field = field
  }
}
