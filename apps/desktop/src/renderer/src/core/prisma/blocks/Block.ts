import { Field } from '../fields/Field'

export type BlockType = 'generator' | 'datasource' | 'model' | 'enum'

export const blockOptions: BlockType[] = ['datasource', 'enum', 'generator', 'model']

export class Block<F extends Field, K = string> {
  private readonly fields = new Map<K, F>()
  readonly blockId: string
  readonly type: BlockType

  constructor(id: string, type: BlockType) {
    this.blockId = id
    this.type = type
  }

  get id(): string {
    return `${this.type}.${this.blockId}`
  }

  field(fieldId: K) {
    return this.fields.get(fieldId)
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
