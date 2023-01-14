import { ScalarType } from '../../constants'
import { DefaultAttribute } from '../../attributes'
import { IdAttribute } from '../../attributes'
import { ModelField } from '../ModelField'
import { Model } from '../../blocks'

export class StringField extends ModelField<DefaultAttribute | IdAttribute> {
  constructor(name: string, model: Model) {
    super(name, ScalarType.STRING, model)
  }
}
