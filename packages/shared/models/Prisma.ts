import {
  PrismaDatasourceProvider,
  PrismaDatasourceRelationMode,
  PrismaDbCommand,
  PrismaDbExecuteCommandInput,
  PrismaGeneralCommand,
  PrismaGeneratorProvider
} from '../configs/prisma'

export interface PrismaDatasource {
  provider: PrismaDatasourceProvider | string
  url: EnvValue
  // TODO
  shadowDatabaseUrl?: string
  // TODO
  relationMode?: PrismaDatasourceRelationMode
  // TODO
  extensions?: string[]
}

export interface PrismaGenerator {
  provider: EnvValue<PrismaGeneratorProvider | string>
  output?: EnvValue
  previewFeatures?: string[]
}

export interface EnvValue<V extends string = string> {
  isEnv: boolean
  value: V
}

export interface PrismaCommandBase {
  name: string
  isDefault: boolean
}

export interface PrismaGenerateCommand extends PrismaCommandBase {
  command: PrismaGeneralCommand.GENERATE
  dataProxy: boolean
  watch: boolean
}

export interface PrismaIntrospectCommand extends PrismaCommandBase {
  command: PrismaGeneralCommand.INTROSPECT
}

export interface PrismaValidateCommand extends PrismaCommandBase {
  command: PrismaGeneralCommand.VALIDATE
  schema?: string
}

export interface PrismaFormatCommand extends PrismaCommandBase {
  command: PrismaGeneralCommand.FORMAT
  schema?: string
}

export interface PrismaDbPullCommand extends PrismaCommandBase {
  command: PrismaDbCommand.PULL
  force: boolean
  print: boolean
  schema?: string
}

export interface PrismaDbPushCommand extends PrismaCommandBase {
  command: PrismaDbCommand.PUSH
  skipGenerate: boolean
  forceReset: boolean
  acceptDataLoss: boolean
  schema?: string
}

export interface PrismaSeedCommand extends PrismaCommandBase {
  command: PrismaDbCommand.SEED
}

export interface PrismaDbExecuteCommand extends PrismaCommandBase {
  command: PrismaDbCommand.EXECUTE
  url: string
  schema: string
  input: PrismaDbExecuteCommandInput
}
