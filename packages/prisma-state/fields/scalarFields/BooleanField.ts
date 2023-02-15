import { Model } from '../../blocks'
import { ScalarType } from '../../constants'
import { ModelField } from '../ModelField'

export class BooleanField extends ModelField {
  constructor(name: string, model: Model) {
    super(name, ScalarType.BOOLEAN, model)
  }

  _clone(block: Model) {
    const cloned = new BooleanField(this.name, block)

    ModelField._cloneModelFieldProps(this, cloned)

    return cloned
  }
}
