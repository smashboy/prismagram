import { Model } from '../../blocks'
import { ScalarType } from '../../constants'
import { ModelField } from '../ModelField'

export class DateTimeField extends ModelField {
  constructor(name: string, model: Model) {
    super(name, ScalarType.DATE_TIME, model)
  }
}
