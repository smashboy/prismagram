import { RelationAttribute } from '../attributes/fieldAttributes/RelationAttribute'
import { ModelField } from './ModelField'

export class RelationField extends ModelField {
  attribute?: RelationAttribute

  constructor(name: string, lineIndex: string, model: string) {
    super(name, lineIndex, model)
  }
}
