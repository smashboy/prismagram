import { ScalarType } from '../../constants'
import { DefaultAttribute } from '../../attributes'
import { IdAttribute } from '../../attributes'
import { ModelField } from '../ModelField'

export class StringField extends ModelField<DefaultAttribute | IdAttribute> {
  constructor(name: string, lineIndex: string) {
    super(name, lineIndex, ScalarType.STRING)
  }
}
