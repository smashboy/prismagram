import { ScalarField } from '../../fields/types'

import { FieldAttribute } from '../FieldAttribute'

export class DefaultAttribute extends FieldAttribute<'value' | 'map', ScalarField> {
  constructor(field: ScalarField) {
    super('default', field)
  }

  _parseArgs(args: string) {
    super._parseArgs(args, 'value')
  }
}
