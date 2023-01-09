import { ModelField } from '../../fields'
import { FieldAttribute } from '../FieldAttribute'

export class IgnoreAttribute extends FieldAttribute<ModelField> {
  constructor(field: ModelField) {
    super('ignore', field)
  }
}
