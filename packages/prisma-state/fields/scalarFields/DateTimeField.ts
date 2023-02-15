import { Model } from '../../blocks'
import { ScalarType } from '../../constants'
import { ModelField } from '../ModelField'

export class DateTimeField extends ModelField {
  constructor(name: string, model: Model) {
    super(name, ScalarType.DATE_TIME, model)
  }

  _clone(block: Model) {
    const cloned = new DateTimeField(this.name, block)

    ModelField._cloneModelFieldProps(this, cloned)

    return cloned
  }
}
