import { ScalarType } from '@shared/common/configs/prisma'
import { ModelField } from '../ModelField'

export class JsonField extends ModelField {
  constructor(name: string, lineIndex: number) {
    super(name, lineIndex, ScalarType.JSON)
  }
}
