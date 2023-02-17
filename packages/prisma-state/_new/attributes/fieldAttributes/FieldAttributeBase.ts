import { FieldAttributeData, FieldAttributeType } from '../../types'
import { AttributeBase, FieldAttrProps } from '../AttributeBase'

export abstract class FieldAttributeBase extends AttributeBase<
  FieldAttributeType,
  FieldAttributeData
> {
  constructor(type: FieldAttributeType, data?: FieldAttrProps) {
    super(type, '@', data)
  }
}
