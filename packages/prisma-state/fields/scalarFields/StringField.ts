import { ScalarType } from '@shared/common/configs/prisma'
import { DefaultAttribute } from '../../attributes/fieldAttributes/DefaultAttribute'
import { IdAttribute } from '../../attributes/fieldAttributes/IdAttribute'
import { ModelField } from '../ModelField'

export class StringField extends ModelField<DefaultAttribute | IdAttribute> {
  constructor(name: string, lineIndex: string) {
    super(name, lineIndex, ScalarType.STRING)
  }
}
