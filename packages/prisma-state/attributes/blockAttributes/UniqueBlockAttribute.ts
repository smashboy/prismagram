import { AttributeArgument as AstAttributeArgument } from '@mrleebo/prisma-ast/src/getSchema'
import { Model } from '../../blocks'
import { BlockAttribute } from '../BlockAttribute'

export class UniqueBlockAttribute extends BlockAttribute<
  Model,
  'fields' | 'name' | 'map' | 'length' | 'sort' | 'clustered'
> {
  constructor(model: Model) {
    super('unique', model)
  }

  setFields(fields: string[]) {
    this.setArgument('fields', fields)
  }

  _parseArgs(args: AstAttributeArgument[]) {
    super._parseArgs(args, 'fields')
  }
}
