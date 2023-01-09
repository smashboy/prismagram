import { ScalarType } from '../../constants'
import { ModelField } from '../ModelField'

export class FloatField extends ModelField {
  constructor(name: string, lineIndex: string) {
    super(name, lineIndex, ScalarType.FLOAT)
  }
}
