import { EOL } from '../../constants'
import { AttributeBase } from '../attributes'
import {
  PrismaSchemaStateInstance,
  TopLevelBlockData,
  TopLevelFieldData,
  Writeable
} from '../types'
import { fieldToString } from '../utils/field'

export abstract class BlockBase<
  B extends TopLevelBlockData,
  F extends TopLevelFieldData,
  BW extends Writeable<B> = Writeable<B>,
  FW extends Writeable<F> = Writeable<F>
> {
  protected data: BW
  protected state: PrismaSchemaStateInstance

  constructor(data: BW, state: PrismaSchemaStateInstance) {
    this.data = data
    this.state = state
  }

  get name() {
    return this.data.name
  }

  get type() {
    return this.data.type
  }

  get fields() {
    return this.data.fields
  }

  get fieldsArray() {
    return [...this.data.fields.values()]
  }

  get fieldNames() {
    return [...this.data.fields.keys()]
  }

  setName(name: string) {
    const updatedBlock = this._data()
    updatedBlock.fields.clear()

    updatedBlock.name = name
    this.fields.forEach((field) =>
      updatedBlock.fields.set(field.name, { ...field, blockId: name } as FW)
    )

    if (this.type === 'model') {
      this.state.removeModel(this.name)
      this.state.createModel(name, updatedBlock)
      return
    }

    if (this.type === 'enum') {
      this.state.removeEnum(this.name)
      this.state.createEnum(name, updatedBlock)
    }
  }

  addField(fieldId: string, data: F) {
    this.data.fields.set(fieldId, data)
    return data
  }

  field<FF extends F>(fieldId: string) {
    return this.data.fields.get(fieldId) as FF
  }

  removeField(fieldId: string) {
    this.data.fields.delete(fieldId)
  }

  _setFromArray(fields: Array<F>) {
    this.data.fields.clear()
    fields.forEach((field) => this.data.fields.set(field.name, field))
  }

  _data() {
    return structuredClone(this.data) as B
  }

  abstract _parse(data: unknown): void

  static _toString(data: TopLevelBlockData, state: PrismaSchemaStateInstance) {
    const { type, name, fields } = data

    const { enumIds, modelIds } = state

    return `${type} ${name} {
      ${[...fields.values()]
        .map((field) => fieldToString(data, field, enumIds, modelIds))
        .join(EOL)}

      ${
        type === 'model' && data.attributes.size > 0
          ? [...data.attributes.values()]
              .map((attr) => AttributeBase._toString('@@', attr))
              .join(EOL)
          : ''
      }
    }`
  }
}
