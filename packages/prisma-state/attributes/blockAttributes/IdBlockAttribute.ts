import { Model } from '../../blocks'
import { BlockAttribute } from '../BlockAttribute'

export class IdBlockAttribute extends BlockAttribute<
  Model,
  'fields' | 'name' | 'map' | 'length' | 'sort' | 'clustered'
> {
  constructor(model: Model) {
    super('id', model)
  }

  _parseArgs(args: string) {
    super._parseArgs(args, 'fields')
  }
}
