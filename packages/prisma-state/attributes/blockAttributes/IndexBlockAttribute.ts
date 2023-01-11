import { Model } from '../../blocks'
import { BlockAttribute } from '../BlockAttribute'

export class IndexBlockAttribute extends BlockAttribute<
  Model,
  'fields' | 'name' | 'map' | 'length' | 'sort' | 'clustered' | 'type' | 'ops'
> {
  constructor(model: Model) {
    super('index', model)
  }

  _parseArgs(args: string): void {
    super._parseArgs(args, 'fields')
  }
}
