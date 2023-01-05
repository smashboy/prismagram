import { ModelField } from './ModelField'

export class EnumModelField extends ModelField {
  constructor(name: string, lineIndex: string, enumOption: string) {
    super(name, lineIndex, enumOption)
  }
}
