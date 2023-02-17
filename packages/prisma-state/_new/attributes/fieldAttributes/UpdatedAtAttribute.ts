import { FieldAttrProps } from '../AttributeBase'
import { FieldAttributeBase } from './FieldAttributeBase'

export class UpdatedAtAttribute extends FieldAttributeBase {
  constructor(data?: FieldAttrProps) {
    super('updatedAt', data)
  }
}
