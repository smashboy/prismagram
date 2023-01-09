import { ScalarType } from '../../constants'
import { ModelField } from '../ModelField'

export class BigIntField extends ModelField {
  constructor(name: string, lineIndex: string) {
    super(name, lineIndex, ScalarType.BIG_INT)
  }
}
