import { ScalarType } from '@shared/common/configs/prisma'
import { ModelField } from '../ModelField'

export class BigIntField extends ModelField {
  constructor(name: string, lineIndex: number) {
    super(name, lineIndex, ScalarType.BIG_INT)
  }
}
