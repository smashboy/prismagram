import { Model } from '../../blocks'
import { ScalarType } from '../../constants'
import { ModelField } from '../ModelField'

export class DecimalField extends ModelField {
  constructor(name: string, model: Model) {
    super(name, ScalarType.DECIMAL, model)
  }

  _clone(block: Model) {
    const cloned = new DecimalField(this.name, block)

    ModelField._cloneModelFieldProps(this, cloned)

    return cloned
  }
}
