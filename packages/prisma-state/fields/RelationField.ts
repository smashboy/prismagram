import { Model } from '../blocks'
import { ModelField } from './ModelField'

export class RelationField extends ModelField {
  constructor(name: string, type: string, model: Model) {
    super(name, type, model)
  }
}
