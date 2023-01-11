import {
  BlockAttribute,
  IdBlockAttribute,
  IgnoreBlockAttribute,
  IndexBlockAttribute,
  MapBlockAttribute,
  UniqueBlockAttribute
} from '../attributes'
import { Field } from '../fields/Field'
import { PrismaSchemaState } from '../PrismaSchemaState'

export type BlockType = 'generator' | 'datasource' | 'model' | 'enum'

export const blockOptions: BlockType[] = ['datasource', 'enum', 'generator', 'model']

const blockAttributesMap = {
  id: IdBlockAttribute,
  ignore: IgnoreBlockAttribute,
  index: IndexBlockAttribute,
  map: MapBlockAttribute,
  unique: UniqueBlockAttribute
}

export class Block<F extends Field = Field, K = string> {
  readonly fields = new Map<K, F>()
  readonly attributes: BlockAttribute[] = []
  name: string
  readonly type: BlockType
  protected readonly state: PrismaSchemaState

  constructor(id: string, type: BlockType, state: PrismaSchemaState) {
    this.name = id
    this.type = type
    this.state = state
  }

  get id(): string {
    return `${this.type}.${this.name}`
  }

  get fieldNames() {
    return [...this.fields.values()].map((field) => field.name)
  }

  setName(name: string) {
    this.state.state.delete(this.id)

    this.name = name

    this.state.state.set(this.id, this)

    console.log('UPDATED STATE', new Map([...this.state.state]))
  }

  remove() {
    this.state.state.delete(this.id)
  }

  field(fieldId: K) {
    return this.fields.get(fieldId) as F | undefined
  }

  protected addField(fieldId: K, field: F) {
    this.fields.set(fieldId, field)
  }

  removeField(fieldId: K) {
    this.fields.delete(fieldId)
    this.state.state.set(this.id, this)
  }

  _toString() {
    return `
    ${this.type} ${this.name} {
      ${[...this.fields.values()].map((field) => `${field._toString()}`).join('\r\n')}
    }
  `
  }

  _parseAttributes(line: string) {
    line = line.replace('@@', '')

    const bracketIndex = line.indexOf('(')

    if (bracketIndex > -1) {
      const name = line.substring(0, bracketIndex)

      if (blockAttributesMap[name]) {
        const attr = new blockAttributesMap[name](this)
        const args = line.substring(bracketIndex + 1, line.lastIndexOf(')'))

        attr._parseArgs(args)
        return this.attributes.push(attr)
      }
    }

    const name = line

    if (blockAttributesMap[name]) {
      const attr = new blockAttributesMap[name](this)
      this.attributes.push(attr)
    }
  }
}
