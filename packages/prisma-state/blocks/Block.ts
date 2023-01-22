import { Datasource as AstDatasource, Generator as AstGenerator } from '@mrleebo/prisma-ast'
import { EnvField, OptionField, OptionsListField } from '../fields'
import { Field } from '../fields/Field'
import { PrismaSchemaState } from '../PrismaSchemaState'

export type BlockType = 'generator' | 'datasource' | 'model' | 'enum'

export const blockOptions: BlockType[] = ['datasource', 'enum', 'generator', 'model']

export class Block<F extends Field = Field, K = string> {
  readonly fields = new Map<K, F>()
  name: string
  readonly type: BlockType
  protected readonly state: PrismaSchemaState

  constructor(name: string, type: BlockType, state: PrismaSchemaState) {
    this.name = name
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
  }

  remove() {
    this.state.state.delete(this.id)
  }

  field<FF = F>(fieldId: K) {
    return this.fields.get(fieldId) as FF | undefined
  }

  protected addField(fieldId: K, field: F) {
    this.fields.set(fieldId, field)
  }

  removeField(fieldId: K) {
    this.fields.delete(fieldId)
    this.state.state.set(this.id, this)
  }

  _parseAssignments(list: (AstGenerator | AstDatasource)['assignments']) {
    for (const assignment of list) {
      if (assignment.type !== 'assignment') continue

      const { key, value } = assignment

      if (value?.type === 'function' && value?.name === 'env') {
        const envField = new EnvField(key)
        envField._parse(value.params)
        this.fields.set(envField.name as unknown as K, envField as unknown as F)
        continue
      }

      if (value?.type === 'array') {
        const optionsField = new OptionsListField(key)
        optionsField._parse(value.args)
        this.fields.set(optionsField.name as unknown as K, optionsField as unknown as F)
        continue
      }

      const optionField = new OptionField(key)
      optionField._parse(value)
      this.fields.set(optionField.name as unknown as K, optionField as unknown as F)
    }
  }

  _toString() {
    return `
    ${this.type} ${this.name} {
      ${[...this.fields.values()].map((field) => `${field._toString()}`).join('\r\n')}
    }
  `
  }
}
