import { Model } from '../../blocks'
import { ScalarType } from '../../constants'
import { ModelField } from '../ModelField'

export class IntField extends ModelField {
  constructor(name: string, model: Model) {
    super(name, ScalarType.INT, model)
  }

  _clone(block: Model) {
    const cloned = new IntField(this.name, block)

    ModelField._cloneModelFieldProps(this, cloned)

    return cloned
  }
}
