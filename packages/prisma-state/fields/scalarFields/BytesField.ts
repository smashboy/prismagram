import { Model } from '../../blocks'
import { ScalarType } from '../../constants'
import { ModelField } from '../ModelField'

export class BytesField extends ModelField {
  constructor(name: string, model: Model) {
    super(name, ScalarType.BYTES, model)
  }
}
