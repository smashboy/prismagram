import { Enum, Model } from '../../blocks'
import { BlockAttribute } from '../BlockAttribute'

export class MapBlockAttribute extends BlockAttribute<Model | Enum, 'name'> {
  constructor(block: Model | Enum) {
    super('map', block)
  }

  _parseArgs(args: string): void {
    super._parseArgs(args, 'name')
  }
}
