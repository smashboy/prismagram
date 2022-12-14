import {
  PrismaDatasourceProvider,
  PrismaDatasourceRelationMode,
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
