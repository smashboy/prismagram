import { Model } from '../../blocks'
import { ModelField } from '../ModelField'

export class EnumModelField extends ModelField {
  constructor(name: string, type: string, model: Model) {
    super(name, type, model)
  }

  _clone(block: Model) {
    const cloned = new EnumModelField(this.name, this.type, block)

    ModelField._cloneModelFieldProps(this, cloned)

    return cloned
  }
}
