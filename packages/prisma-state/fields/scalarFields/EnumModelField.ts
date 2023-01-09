import { ModelField } from '../ModelField'

export class EnumModelField extends ModelField {
  constructor(name: string, lineIndex: string, type: string) {
    super(name, lineIndex, type)
  }
}
