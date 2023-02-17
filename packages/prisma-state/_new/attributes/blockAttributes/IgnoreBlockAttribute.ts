import { BlockAttrProps } from '../AttributeBase'
import { BlockAttributeBase } from './BlockAttributeBase'

export class IgnoreBlockAttribute extends BlockAttributeBase {
  constructor(data?: BlockAttrProps) {
    super('ignore', data)
  }
}
