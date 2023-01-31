import { AttributeArgument as AstAttributeArgument } from '@mrleebo/prisma-ast/src/getSchema'
import { Enum, Model } from '../../blocks'
import { BlockAttribute } from '../BlockAttribute'

export class MapBlockAttribute extends BlockAttribute<Model | Enum, 'name'> {
  constructor(block: Model | Enum) {
    super('map', block)
  }

  get name() {
    return (this.arguments.get('name') as string) || null
  }

  setName(value: string) {
    this.setArgument('name', value)
  }

  _parseArgs(args: AstAttributeArgument[]): void {
    super._parseArgs(args, 'name')
  }
}
