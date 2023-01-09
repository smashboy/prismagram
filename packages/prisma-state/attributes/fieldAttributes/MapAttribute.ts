import { RelationField } from '../../fields/RelationField'
import { ScalarField } from '../../fields/types'
import { FieldAttribute } from '../FieldAttribute'

export class MapAttribute extends FieldAttribute<'name', ScalarField | RelationField> {
  constructor(field: ScalarField | RelationField) {
    super('map', field)
  }

  _parseArgs(args: string) {
    super._parseArgs(args, 'name')
  }
}
