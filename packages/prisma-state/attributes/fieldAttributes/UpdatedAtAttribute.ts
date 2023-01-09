import { DateTimeField } from '../../fields/scalarFields/DateTimeField'
import { FieldAttribute } from '../FieldAttribute'

export class UpdatedAtAttribute extends FieldAttribute<DateTimeField> {
  constructor(field: DateTimeField) {
    super('updatedAt', field)
  }
}
