import { Model } from '../../blocks'
import { BlockAttribute } from '../BlockAttribute'

export class IgnoreBlockAttribute extends BlockAttribute<Model> {
  constructor(model: Model) {
    super('ignore', model)
  }

  _clone(block: Model) {
    return new IgnoreBlockAttribute(block)
  }
}
