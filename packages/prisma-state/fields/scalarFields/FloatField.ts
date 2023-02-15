import { Model } from '../../blocks'
import { ScalarType } from '../../constants'
import { ModelField } from '../ModelField'

export class FloatField extends ModelField {
  constructor(name: string, model: Model) {
    super(name, ScalarType.FLOAT, model)
  }

  _clone(block: Model) {
    const cloned = new FloatField(this.name, block)

    ModelField._cloneModelFieldProps(this, cloned)

    return cloned
  }
}
