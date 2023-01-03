import { scalarOptionsArray, ScalarType } from '@shared/common/configs/prisma'
import { Field } from './Field'

type ModelFieldType = ScalarType | string

export class ModelField extends Field {
  type: ModelFieldType
  modifier: 'optional' | 'list' | null = null

  constructor(name: string, lineIndex: number, type: ModelFieldType) {
    super(name, lineIndex)
    this.type = type
  }

  protected _isScalarType() {
    return scalarOptionsArray.includes(this.type as ScalarType)
  }
}
