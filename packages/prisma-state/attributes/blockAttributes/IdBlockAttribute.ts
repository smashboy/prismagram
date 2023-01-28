import { AttributeArgument as AstAttributeArgument } from '@mrleebo/prisma-ast'
import { Model } from '../../blocks'
import { BlockAttribute } from '../BlockAttribute'

export class IdBlockAttribute extends BlockAttribute<
  Model,
  'fields' | 'name' | 'map' | 'length' | 'sort' | 'clustered'
> {
  constructor(model: Model) {
    super('id', model)
  }

  _parseArgs(args: AstAttributeArgument[]) {
    super._parseArgs(args, 'fields')
  }
}
