import { AttributeArgument as AstAttributeArgument } from '@mrleebo/prisma-ast/src/getSchema'
import { RelationField } from '../../fields'
import { ScalarField } from '../../fields/types'
import { FieldAttribute } from '../FieldAttribute'

export class MapAttribute extends FieldAttribute<ScalarField | RelationField, 'name'> {
  constructor(field: ScalarField | RelationField, inialValues?: Map<string, unknown>) {
    super('map', field, inialValues)
  }

  get name() {
    return (this.argumentsMap.get('name') as string) || null
  }

  setName(value: string) {
    this.setArgument('name', value)
  }

  _parseArgs(args: AstAttributeArgument[]) {
    super._parseArgs(args, 'name')
  }
}
