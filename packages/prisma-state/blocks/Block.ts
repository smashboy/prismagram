import { Field } from '../fields/Field'
import { PrismaSchemaState } from '../PrismaSchemaState'

export type BlockType = 'generator' | 'datasource' | 'model' | 'enum'

export const blockOptions: BlockType[] = ['datasource', 'enum', 'generator', 'model']

export class Block<F = Field, K = string> {
  readonly fields = new Map<K, F>()
  blockId: string
  readonly type: BlockType
  protected readonly state: PrismaSchemaState

  constructor(id: string, type: BlockType, state: PrismaSchemaState) {
    this.blockId = id
    this.type = type
    this.state = state
  }

  get id(): string {
    return `${this.type}.${this.blockId}`
  }

  get fieldNames() {
    return [...this.fields.values()].map((field) => field.name)
  }

  setName(name: string) {
    this.blockId = name
  }

  field<SF = Field>(fieldId: K) {
    return this.fields.get(fieldId) as SF | undefined
  }

  protected addField(fieldId: K, field: F) {
    this.fields.set(fieldId, field)
  }

  deleteField(fieldId: K) {
    this.fields.delete(fieldId)
  }

  _toString() {
    return `
    ${this.type} ${this.blockId} {
      ${[...this.fields.values()].map((field) => `${field._toString()}`).join('\r\n')}
    }
  `
  }
}
