import { EOL } from '../../constants'
import { AttributeBase } from '../attributes'
import {
  DatasourceData,
  EnumData,
  EnumModelFieldData,
  GeneratorData,
  ModelData,
  PrismaSchemaStateInstance,
  RelationFieldData,
  ScalarFieldData,
  TopLevelFieldData
} from '../types'
import { fieldToString } from '../utils/field'

export abstract class BlockBase<B extends DatasourceData | GeneratorData | EnumData | ModelData> {
  protected data: B
  protected state: PrismaSchemaStateInstance

  constructor(data: B, state: PrismaSchemaStateInstance) {
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

  get fieldNames() {
    return [...this.data.fields.keys()]
  }

  addField(fieldId: string, data: TopLevelFieldData) {
    this.data.fields.set(fieldId, data)
    return data
  }

  field<F extends TopLevelFieldData>(fieldId: string) {
    return this.data.fields.get(fieldId) as F
  }

  removeField(fieldId: string) {
    this.data.fields.delete(fieldId)
  }

  _setFromArray(fields: Array<RelationFieldData | ScalarFieldData | EnumModelFieldData>) {
    this.data.fields.clear()
    fields.forEach((field) => this.data.fields.set(field.name as unknown as unknown as K, field))
  }

  _data() {
    return structuredClone(this.data)
  }

  abstract _parse(data: unknown): void

  static _toString(
    data: DatasourceData | GeneratorData | EnumData | ModelData,
    state: PrismaSchemaStateInstance
  ) {
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
