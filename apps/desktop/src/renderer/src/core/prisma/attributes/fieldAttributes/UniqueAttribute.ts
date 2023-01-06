import { ScalarField } from '../../fields/types'
import { FieldAttribute } from '../FieldAttribute'

export class UniqueAttribute extends FieldAttribute<
  'map' | 'length' | 'sort' | 'clustered',
  ScalarField
> {
  constructor(field: ScalarField) {
    super('unique', field)
  }
}
