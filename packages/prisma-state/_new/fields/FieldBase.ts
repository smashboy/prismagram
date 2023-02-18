import {
  EnumFieldData,
  EnumModelFieldData,
  EnvFieldData,
  OptionFieldData,
  RelationFieldData,
  ScalarFieldData,
  OptionsListFieldData
} from '../types'

export abstract class FieldBase<
  T extends
    | EnvFieldData
    | OptionFieldData
    | OptionsListFieldData
    | RelationFieldData
    | ScalarFieldData
    | EnumModelFieldData
    | EnumFieldData
> {
  protected data: T

  constructor(data: T) {
    this.data = data
  }

  get name() {
    return this.data.name
  }

  get blockId() {
    return this.data.blockId
  }

  _data() {
    return structuredClone(this.data)
  }
}
