import { RelationField, ScalarField } from '../../fields'
import { FieldAttribute } from '../FieldAttribute'

export class IgnoreAttribute extends FieldAttribute<ScalarField | RelationField> {
  constructor(field: ScalarField | RelationField) {
    super('ignore', field)
  }
}
