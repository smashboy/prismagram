import { BlockAttributeData, BlockAttributeType } from '../../types'
import { AttributeBase, BlockAttrProps } from '../AttributeBase'

export abstract class BlockAttributeBase extends AttributeBase<
  BlockAttributeType,
  BlockAttributeData
> {
  constructor(type: BlockAttributeType, data?: BlockAttrProps) {
    super(type, '@@', data)
  }
}
