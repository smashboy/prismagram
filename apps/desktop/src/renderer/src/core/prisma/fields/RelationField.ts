import { ModelField } from './ModelField'

export class RelationField extends ModelField {
  constructor(name: string, lineIndex: string, model: string) {
    super(name, lineIndex, model)
  }
}
