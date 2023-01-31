import { AttributeArgument as AstAttributeArgument } from '@mrleebo/prisma-ast/src/getSchema'
import { Model } from '../../blocks'
import { BlockAttribute } from '../BlockAttribute'

// TODO setters&getters
export class IndexBlockAttribute extends BlockAttribute<
  Model,
  'fields' | 'name' | 'map' | 'length' | 'sort' | 'clustered' | 'type' | 'ops'
> {
  constructor(model: Model) {
    super('index', model)
  }

  get name() {
    return (this.arguments.get('name') as string) || null
  }

  get fields() {
    return (this.arguments.get('fields') as string[]) || []
  }

  get map() {
    return (this.arguments.get('map') as string) || null
  }

  get length() {
    return (this.arguments.get('length') as number) || null
  }

  get sort() {
    return (this.arguments.get('sort') as 'Asc' | 'Desc') || null
  }

  get clustered() {
    return (this.arguments.get('clustered') as boolean) || null
  }

  _parseArgs(args: AstAttributeArgument[]): void {
    super._parseArgs(args, 'fields')
  }
}
