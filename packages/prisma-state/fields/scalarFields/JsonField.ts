import { Model } from '../../blocks'
import { ScalarType } from '../../constants'
import { ModelField } from '../ModelField'

export class JsonField extends ModelField {
  constructor(name: string, model: Model) {
    super(name, ScalarType.JSON, model)
  }

  _clone(block: Model) {
    const cloned = new JsonField(this.name, block)

    ModelField._cloneModelFieldProps(this, cloned)

    return cloned
  }
}
