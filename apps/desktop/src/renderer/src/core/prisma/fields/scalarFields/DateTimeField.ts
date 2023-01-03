import { ScalarType } from '@shared/common/configs/prisma'
import { ModelField } from '../ModelField'

export class DateTimeField extends ModelField {
  constructor(name: string, lineIndex: string) {
    super(name, lineIndex, ScalarType.DATE_TIME)
  }
}
