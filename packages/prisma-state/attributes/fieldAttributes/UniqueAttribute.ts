import { ScalarField } from '../../fields'
import { FieldAttribute } from '../FieldAttribute'

export class UniqueAttribute extends FieldAttribute<
  ScalarField,
  'map' | 'length' | 'sort' | 'clustered'
> {
  constructor(field: ScalarField) {
    super('unique', field)
  }
}
