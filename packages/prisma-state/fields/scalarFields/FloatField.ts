import { Model } from '../../blocks'
import { ScalarType } from '../../constants'
import { ModelField } from '../ModelField'

export class FloatField extends ModelField {
  constructor(name: string, model: Model) {
    super(name, ScalarType.FLOAT, model)
  }
}
