import { Field } from '../fields/Field'

export type BlockType = 'generator' | 'datasource' | 'model' | 'enum'

export const blockOptions: BlockType[] = ['datasource', 'enum', 'generator', 'model']

export class Block<F = Field, K = string> {
  readonly fields = new Map<K, F>()
  readonly blockId: string
  readonly type: BlockType

  constructor(id: string, type: BlockType) {
    this.blockId = id
    this.type = type
  }

  get id(): string {
    return `${this.type}.${this.blockId}`
  }

  field<SF = Field>(fieldId: K) {
    return this.fields.get(fieldId) as SF | undefined
  }

  addField(fieldId: K, field: F) {
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
