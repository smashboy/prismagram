import { ScalarTypeOption } from '../constants'

export type BlockType = 'generator' | 'datasource' | 'model' | 'enum'
export type BlockAttributeType = 'id' | 'index' | 'unique' | 'map' | 'ignore'
export type FieldAttributeType =
  | 'id'
  | 'default'
  | 'unique'
  | 'map'
  | 'relation'
  | 'updatedAt'
  | 'ignore'
export type FieldModifier = 'optional' | 'list' | null

export type PrismaSchemaStateData = Map<string, Datasource | Generator | Enum | Model>

export interface Block<T extends string, F extends Field, K = string> {
  readonly name: string
  readonly type: T
  readonly fields: Map<K, F>
}

export interface Field {
  readonly name: string
}

export interface Attribute<T extends string> {
  type: T
  readonly arguments: unknown[]
}

export type BlockAttribute = Attribute<BlockAttributeType>

export type FieldAttribute = Attribute<FieldAttributeType>

export type Datasource = Block<
  'datasource',
  EnvField | OptionField,
  'provider' | 'url' | 'shadowDatabaseUrl' | 'relationMode'
>

export type Generator = Block<
  'generator',
  EnvField | OptionField,
  'provider' | 'output' | 'previewFeatures' | 'binaryTargets' | 'engineType'
>

export interface EnvField extends Field {
  value: string
  isEnv: boolean
}

export interface OptionField extends Field {
  value: string
}

export interface OptionsListField extends Field {
  readonly options: Set<string>
}

export type Enum = Block<'enum', Field>

export interface Model extends Block<'model', ModelField> {
  readonly attributes: Map<string, BlockAttribute>
}

export interface ModelField extends Field {
  readonly type: string
  modifier: FieldModifier
  readonly attributes: Map<string, FieldAttribute>
}

export interface ScalarField extends ModelField {
  readonly type: ScalarTypeOption
}
