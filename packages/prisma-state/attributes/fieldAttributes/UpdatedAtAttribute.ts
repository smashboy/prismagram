import { DateTimeField } from '../../fields'
import { FieldAttribute } from '../FieldAttribute'

export class UpdatedAtAttribute extends FieldAttribute<DateTimeField> {
  constructor(field: DateTimeField) {
    super('updatedAt', field)
  }

  _clone(field: DateTimeField) {
    return new UpdatedAtAttribute(field)
  }
}
