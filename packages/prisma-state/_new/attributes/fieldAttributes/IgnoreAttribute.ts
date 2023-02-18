import { FieldAttrProps } from '../AttributeBase'
import { FieldAttributeBase } from './FieldAttributeBase'

export class IgnoreAttribute extends FieldAttributeBase {
  constructor(data?: FieldAttrProps) {
    super('ignore', data)
  }
}
