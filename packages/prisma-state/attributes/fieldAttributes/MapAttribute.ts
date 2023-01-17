import { AttributeArgument as AstAttributeArgument } from '@mrleebo/prisma-ast'
import { RelationField } from '../../fields'
import { ScalarField } from '../../fields/types'
import { FieldAttribute } from '../FieldAttribute'

export class MapAttribute extends FieldAttribute<ScalarField | RelationField, 'name'> {
  constructor(field: ScalarField | RelationField) {
    super('map', field)
  }

  _parseArgs(args: AstAttributeArgument[]) {
    super._parseArgs(args, 'name')
  }
}
