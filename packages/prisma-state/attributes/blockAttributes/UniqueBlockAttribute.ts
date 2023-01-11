import { Model } from '../../blocks'
import { BlockAttribute } from '../BlockAttribute'

export class UniqueBlockAttribute extends BlockAttribute<
  Model,
  'fields' | 'name' | 'map' | 'length' | 'sort' | 'clustered'
> {
  constructor(model: Model) {
    super('unique', model)
  }

  _parseArgs(args: string) {
    super._parseArgs(args, 'fields')
  }
}
