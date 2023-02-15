import { Model } from '../../blocks'
import { ScalarType } from '../../constants'
import { ModelField } from '../ModelField'

export class BigIntField extends ModelField {
  constructor(name: string, model: Model) {
    super(name, ScalarType.BIG_INT, model)
  }

  _clone(block: Model) {
    const cloned = new BigIntField(this.name, block)

    ModelField._cloneModelFieldProps(this, cloned)

    return cloned
  }
}
