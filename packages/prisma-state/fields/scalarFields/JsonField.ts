import { ScalarType } from '../../constants'
import { ModelField } from '../ModelField'

export class JsonField extends ModelField {
  constructor(name: string, lineIndex: string) {
    super(name, lineIndex, ScalarType.JSON)
  }
}
