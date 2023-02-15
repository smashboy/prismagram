import { Block } from '../blocks'
import { Attribute } from './Attribute'

export type BlockAttributeType = 'id' | 'index' | 'unique' | 'map' | 'ignore'

export abstract class BlockAttribute<B extends Block = Block, AK = string> extends Attribute<
  BlockAttributeType,
  AK
> {
  protected readonly model: B

  constructor(type: BlockAttributeType, model: B, inialValues?: Map<string, unknown>) {
    super(type, '@@', inialValues)
    this.model = model
  }

  _toString() {
    return super._toString()
  }

  abstract _clone(block: B): BlockAttribute
}
