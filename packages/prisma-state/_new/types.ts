import { ScalarTypeOption } from '../constants'

export type BlockType = 'generator' | 'datasource' | 'model' | 'enum'
export type SettingsFieldType = 'env' | 'option' | 'list'
export type BlockAttributeType = 'id' | 'index' | 'unique' | 'map' | 'ignore'
export type FieldAttributeType =
  | 'id'
  | 'default'
  | 'unique'
  | 'map'
  | 'relation'
  | 'updatedAt'
  | 'ignore'
export type AttributeFunctionType =
  | 'auto'
  | 'autoincrement'
  | 'sequence'
  | 'cuid'
  | 'uuid'
  | 'now'
  | 'dbgenerated'
export type FieldModifier = 'optional' | 'list' | null

export type PrismaSchemaStateData = Map<string, Datasource | Generator | Enum | Model>

export interface AttributeFunction {
  type: AttributeFunctionType
  isAttributeFunction: true
}

export interface Block<T extends string, F extends Field, K = string> {
  readonly name: string
  readonly type: T
  readonly fields: Map<K, F>
}

export interface Field {
  readonly name: string
  readonly type: string
}

export interface Attribute<T extends string> {
  readonly type: T
  readonly _prefix: '@' | '@@'
  readonly arguments: Map<string, unknown>
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
  readonly type: 'env'
}

export interface OptionField extends Field {
  value: string
  readonly type: 'option'
}

export interface OptionsListField extends Field {
  readonly options: Set<string>
  readonly type: 'list'
}

export type Enum = Block<'enum', Field>

export interface Model extends Block<'model', RelationField | ScalarField | EnumModelField> {
  readonly attributes: Map<string, BlockAttribute>
}

export interface ModelField extends Field {
  modifier: FieldModifier
  readonly attributes: Map<string, FieldAttribute>
}

export interface RelationField extends ModelField {
  readonly isRelationField: true
}

export interface EnumModelField extends ModelField {
  readonly isEnumField: true
}

export interface ScalarField extends ModelField {
  readonly type: ScalarTypeOption
}

export interface PrismaSchemaStateInstance {
  readonly datasource: Datasource
  readonly generators: Map<string, Generator>
  readonly models: Map<string, Model>
  readonly enums: Map<string, Enum>
  readonly modelIds: string[]
  readonly enumIds: string[]
  model(id: string): Model
  enum(id: string): Enum
  toString(): string
  fromString(schema: string): void
  _clone(): PrismaSchemaStateInstance
}
