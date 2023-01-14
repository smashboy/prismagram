import { Model } from '../../blocks'
import { ScalarType } from '../../constants'
import { ModelField } from '../ModelField'

export class BigIntField extends ModelField {
  constructor(name: string, model: Model) {
    super(name, ScalarType.BIG_INT, model)
  }
}
