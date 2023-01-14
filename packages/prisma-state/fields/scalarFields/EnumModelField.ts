import { Model } from '../../blocks'
import { ModelField } from '../ModelField'

export class EnumModelField extends ModelField {
  constructor(name: string, type: string, model: Model) {
    super(name, type, model)
  }
}
