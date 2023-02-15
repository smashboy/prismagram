import { Model } from '../../blocks'
import { ScalarType } from '../../constants'
import { ModelField } from '../ModelField'

export class BytesField extends ModelField {
  constructor(name: string, model: Model) {
    super(name, ScalarType.BYTES, model)
  }

  _clone(block: Model) {
    const cloned = new BytesField(this.name, block)

    ModelField._cloneModelFieldProps(this, cloned)

    return cloned
  }
}
