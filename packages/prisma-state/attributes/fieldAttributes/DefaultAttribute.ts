import { ScalarField } from '../../fields'
import { FieldAttribute } from '../FieldAttribute'

export class DefaultAttribute extends FieldAttribute<ScalarField, 'value' | 'map'> {
  constructor(field: ScalarField) {
    super('default', field)
  }

  _parseArgs(args: string) {
    super._parseArgs(args, 'value')
  }
}
