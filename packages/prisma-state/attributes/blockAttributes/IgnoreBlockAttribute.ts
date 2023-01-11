import { Model } from '../../blocks'
import { BlockAttribute } from '../BlockAttribute'

export class IgnoreBlockAttribute extends BlockAttribute<Model> {
  constructor(model: Model) {
    super('ignore', model)
  }
}
