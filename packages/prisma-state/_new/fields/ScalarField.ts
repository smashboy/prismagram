import { ModelFieldBase } from './ModelFieldBase'
import { ScalarTypeOption } from '../../constants'
import { ScalarFieldData } from '../types'

export class ScalarField extends ModelFieldBase<ScalarFieldData> {
  constructor(
    name: string,
    type: ScalarTypeOption,
    blockId: string,
    data: ScalarFieldData = {
      name,
      type,
      blockId,
      modifier: null,
      attributes: new Map()
    }
  ) {
    super(data)
  }
}
