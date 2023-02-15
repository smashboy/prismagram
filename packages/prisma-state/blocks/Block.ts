import {
  Datasource as AstDatasource,
  Generator as AstGenerator
} from '@mrleebo/prisma-ast/src/getSchema'
import { EnvField, OptionField, OptionsListField } from '../fields'
import { Field } from '../fields/Field'
import { PrismaSchemaState } from '../PrismaSchemaState'
import { Datasource } from './Datasource'
import { Generator } from './Generator'

export type BlockType = 'generator' | 'datasource' | 'model' | 'enum'

export const blockOptions: BlockType[] = ['datasource', 'enum', 'generator', 'model']

const datasourceEnvFields = ['url', 'shadowDatabaseUrl']
const generatorEnvFields = ['provider', 'output']

export abstract class Block<F extends Field = Field, K = string> {
  protected readonly fieldsMap = new Map<K, F>()
  name: string
  readonly type: BlockType
  readonly state: PrismaSchemaState

  constructor(name: string, type: BlockType, state: PrismaSchemaState) {
    this.name = name
    this.type = type
    this.state = state
  }

  get id(): string {
    return `${this.type}.${this.name}`
  }

  get fieldNames() {
    return [...this.fieldsMap.values()].map((field) => field.name)
  }

  get fields() {
    return [...this.fieldsMap.values()]
  }

  setName(name: string) {
    this.state.state.delete(this.id)

    this.name = name

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.state.state.set(this.id, this)
  }

  field<FF = F>(fieldId: K) {
    return this.fieldsMap.get(fieldId)! as unknown as FF
  }

  addField(fieldId: K, field: F) {
    this.fieldsMap.set(fieldId, field)
    return this.field<F>(fieldId)!
  }

  removeField(fieldId: K) {
    this.fieldsMap.delete(fieldId)
  }

  _setFromArray(fields: F[]) {
    this.fieldsMap.clear()
    fields.forEach((field) => this.fieldsMap.set(field.name as unknown as unknown as K, field))
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
        const envField = new EnvField(key, this as unknown as Datasource | Generator)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        envField._parse(value?.params ?? [value])

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (!value?.params) {
          envField.toggleIsEnv(false)
        }

        this.fieldsMap.set(envField.name as unknown as K, envField as unknown as F)
        continue
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (value?.type === 'array') {
        const optionsField = new OptionsListField(key, this as unknown as Datasource | Generator)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        optionsField._parse(value.args)
        this.fieldsMap.set(optionsField.name as unknown as K, optionsField as unknown as F)
        continue
      }

      const optionField = new OptionField(key, this as unknown as Datasource | Generator)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      optionField._parse(value)
      this.fieldsMap.set(optionField.name as unknown as K, optionField as unknown as F)
    }
  }

  _toString() {
    return `
    ${this.type} ${this.name} {
      ${this.fields.map((field) => `${field._toString()}`).join('\r\n')}
    }
  `
  }

  abstract _clone(state: PrismaSchemaState): Block
}
