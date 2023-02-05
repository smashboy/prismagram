import { AttributeArgument as AstAttributeArgument } from '@mrleebo/prisma-ast/src/getSchema'
import { Model } from '../../blocks'
import { BlockAttribute } from '../BlockAttribute'

export class IdBlockAttribute extends BlockAttribute<
  Model,
  'fields' | 'name' | 'map' | 'length' | 'sort' | 'clustered'
> {
  constructor(model: Model) {
    super('id', model)
  }

  get name() {
    return (this.argumentsMap.get('name') as string) || null
  }

  get fields() {
    return (this.argumentsMap.get('fields') as string[]) || []
  }

  get map() {
    return (this.argumentsMap.get('map') as string) || null
  }

  get length() {
    return (this.argumentsMap.get('length') as number) || null
  }

  get sort() {
    return (this.argumentsMap.get('sort') as 'Asc' | 'Desc') || null
  }

  get clustered() {
    return (this.argumentsMap.get('clustered') as boolean) || null
  }

  _parseArgs(args: AstAttributeArgument[]) {
    super._parseArgs(args, 'fields')
  }
}
