import { Datasource as AstDatasource, Generator as AstGenerator } from '@mrleebo/prisma-ast'
import { EnvField, OptionField, OptionsListField } from '../fields'
import { Field } from '../fields/Field'
import { PrismaSchemaState } from '../PrismaSchemaState'

export type BlockType = 'generator' | 'datasource' | 'model' | 'enum'

export const blockOptions: BlockType[] = ['datasource', 'enum', 'generator', 'model']

const datasourceEnvFields = ['url', 'shadowDatabaseUrl']
const generatorEnvFields = ['provider', 'output']

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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.state.state.set(this.id, this)
  }

  remove() {
    this.state.state.delete(this.id)
  }

  field<FF = F>(fieldId: K) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.fields.get(fieldId)! as FF
  }

  addField(fieldId: K, field: F) {
    this.fields.set(fieldId, field)
    return this.field<F>(fieldId)!
  }

  removeField(fieldId: K) {
    this.fields.delete(fieldId)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.state.state.set(this.id, this)
  }

  _parseAssignments(list: (AstGenerator | AstDatasource)['assignments']) {
    for (const assignment of list) {
      if (assignment.type !== 'assignment') continue

      const { key, value } = assignment

      if (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (value?.type === 'function' && value?.name === 'env') ||
        (this.type === 'datasource' && datasourceEnvFields.includes(key)) ||
        (this.type === 'generator' && generatorEnvFields.includes(key))
      ) {
        const envField = new EnvField(key)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        envField._parse(value?.params ?? [value])

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (!value?.params) {
          envField.toggleIsEnv(false)
        }

        this.fields.set(envField.name as unknown as K, envField as unknown as F)
        continue
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (value?.type === 'array') {
        const optionsField = new OptionsListField(key)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        optionsField._parse(value.args)
        this.fields.set(optionsField.name as unknown as K, optionsField as unknown as F)
        continue
      }

      const optionField = new OptionField(key)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
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
