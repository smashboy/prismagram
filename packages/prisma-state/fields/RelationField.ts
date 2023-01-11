import { Model } from '../blocks'
import { ModelField } from './ModelField'

export class RelationField extends ModelField {
  constructor(name: string, lineIndex: string, model: Model) {
    super(name, lineIndex, model.name, model)
  }
}
