import { Model } from '../../blocks'
import { ScalarType } from '../../constants'
import { ModelField } from '../ModelField'

export class JsonField extends ModelField {
  constructor(name: string, lineIndex: string, model: Model) {
    super(name, lineIndex, ScalarType.JSON, model)
  }
}
