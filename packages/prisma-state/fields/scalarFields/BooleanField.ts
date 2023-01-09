import { Model } from '../../blocks'
import { ScalarType } from '../../constants'
import { ModelField } from '../ModelField'

export class BooleanField extends ModelField {
  constructor(name: string, lineIndex: string, model: Model) {
    super(name, lineIndex, ScalarType.BOOLEAN, model)
  }
}
