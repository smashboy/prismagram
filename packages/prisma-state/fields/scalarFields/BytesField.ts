import { ScalarType } from '../../constants'
import { ModelField } from '../ModelField'

export class BytesField extends ModelField {
  constructor(name: string, lineIndex: string) {
    super(name, lineIndex, ScalarType.BYTES)
  }
}
