import { ModelFieldBase } from './ModelFieldBase'
import { EnumModelFieldData } from '../types'

export class EnumModelField extends ModelFieldBase<EnumModelFieldData> {
  constructor(
    name: string,
    type: string,
    blockId: string,
    data: EnumModelFieldData = {
      name,
      type,
      blockId,
      modifier: null,
      attributes: new Map(),
      isEnumField: true
    }
  ) {
    super(data)
  }
}
