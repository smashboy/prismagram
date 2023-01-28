import { AttributeArgument as AstAttributeArgument } from '@mrleebo/prisma-ast/src/getSchema'
import { ScalarField } from '../../fields'
import { FieldAttribute } from '../FieldAttribute'

export class DefaultAttribute extends FieldAttribute<ScalarField, 'value' | 'map'> {
  constructor(field: ScalarField) {
    super('default', field)
  }

  _parseArgs(args: AstAttributeArgument[]) {
    super._parseArgs(args, 'value')
  }
}
