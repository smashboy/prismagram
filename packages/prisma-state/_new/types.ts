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

export type PrismaSchemaStateData = Map<
  string,
  DatasourceData | GeneratorData | EnumData | ModelData
>

export interface AttributeFunction {
  type: AttributeFunctionType
  isAttributeFunction: true
}

export interface BlockData<T extends string, F extends FieldData, K = string> {
  readonly name: string
  readonly type: T
  readonly fields: Map<K, F>
}

export interface FieldData {
  readonly name: string
  readonly type: string
  readonly blockId: string
}

export interface AttributeData<T extends string> {
  readonly type: T
  readonly arguments: Map<string, unknown>
}

export type BlockAttributeData = AttributeData<BlockAttributeType>

export type FieldAttributeData = AttributeData<FieldAttributeType>

export type DatasourceData = BlockData<
  'datasource',
  EnvFieldData | OptionFieldData,
  'provider' | 'url' | 'shadowDatabaseUrl' | 'relationMode'
>

export type GeneratorData = BlockData<
  'generator',
  EnvFieldData | OptionFieldData,
  'provider' | 'output' | 'previewFeatures' | 'binaryTargets' | 'engineType'
>

export interface EnvFieldData extends FieldData {
  value: string
  isEnv: boolean
  readonly type: 'env'
}

export interface OptionFieldData extends FieldData {
  value: string
  readonly type: 'option'
}

export interface OptionsListFieldData extends FieldData {
  readonly options: Set<string>
  readonly type: 'list'
}

export type EnumData = BlockData<'enum', FieldData>

export interface EnumFieldData extends FieldData {
  readonly type: 'enumOption'
}

export interface ModelData
  extends BlockData<'model', RelationFieldData | ScalarFieldData | EnumModelFieldData> {
  readonly attributes: Map<string, BlockAttributeData>
}

export interface ModelFieldData extends FieldData {
  modifier: FieldModifier
  readonly attributes: Map<string, FieldAttributeData>
}

export interface RelationFieldData extends ModelFieldData {
  readonly isRelationField: true
}

export interface EnumModelFieldData extends ModelFieldData {
  readonly isEnumField: true
}

export interface ScalarFieldData extends ModelFieldData {
  readonly type: ScalarTypeOption
}

export interface PrismaSchemaStateInstance {
  readonly datasource: DatasourceData
  readonly generators: Map<string, GeneratorData>
  readonly models: Map<string, ModelData>
  readonly enums: Map<string, EnumData>
  readonly modelIds: string[]
  readonly enumIds: string[]
  model(id: string): ModelData
  enum(id: string): EnumData
  toString(): string
  fromString(schema: string): void
  _clone(): PrismaSchemaStateInstance
}
