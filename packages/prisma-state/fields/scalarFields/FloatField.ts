import { Model } from '../../blocks'
import { ScalarType } from '../../constants'
import { ModelField } from '../ModelField'

export class FloatField extends ModelField {
  constructor(name: string, lineIndex: string, model: Model) {
    super(name, lineIndex, ScalarType.FLOAT, model)
  }
}
