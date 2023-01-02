export const PrismaDatasourceProvider = {
  POSTGRESQL: 'postgresql',
  MYSQL: 'mysql',
  SQLLITE: 'sqlite',
  SQLSERVER: 'sqlserver',
  MONGODB: 'mongodb',
  COCKROACHDB: 'cockroachdb'
} as const

export type PrismaDatasourceProviderType =
  typeof PrismaDatasourceProvider[keyof typeof PrismaDatasourceProvider]

export const prismaDatasourceProvidersArray = [
  PrismaDatasourceProvider.COCKROACHDB,
  PrismaDatasourceProvider.MONGODB,
  PrismaDatasourceProvider.MYSQL,
  PrismaDatasourceProvider.POSTGRESQL,
  PrismaDatasourceProvider.SQLLITE,
  PrismaDatasourceProvider.SQLSERVER
]

export const PrismaDatasourceRelationMode = {
  FOREIGN_KEYS: 'foreignKeys',
  PRISMA: 'prisma'
} as const

export type PrismaDatasourceRelationModeType =
  typeof PrismaDatasourceRelationMode[keyof typeof PrismaDatasourceRelationMode]

export const prismaDatasourceRelationModesArray = [
  PrismaDatasourceRelationMode.FOREIGN_KEYS,
  PrismaDatasourceRelationMode.PRISMA
]

export enum PrismaGeneratorProvider {
  PRISMA_CLIENT_JS = 'prisma-client-js'
}

export const prismaRelationModesList = ['foreignKeys', 'prisma'] as const

export const prismaEngineTypesList = ['binary', 'dataproxy', 'library'] as const

export const DEFAULT_PRISMA_STUDIO_PORT = 5555

export const prismaBinaryTargetsList = [
  'native',
  'darwin',
  'darwin-arm64',
  'debian-openssl-1.0.x',
  'debian-openssl-1.1.x',
  'debian-openssl-3.0.x',
  'rhel-openssl-1.0.x',
  'rhel-openssl-1.1.x',
  'rhel-openssl-3.0.x',
  'linux-arm64-openssl-1.1.x',
  'linux-arm64-openssl-1.0.x',
  'linux-arm64-openssl-3.0.x',
  'linux-arm-openssl-1.1.x',
  'linux-arm-openssl-1.0.x',
  'linux-arm-openssl-3.0.x',
  'linux-musl',
  'linux-nixos',
  'windows',
  'freebsd11',
  'freebsd12',
  'freebsd13',
  'openbsd',
  'netbsd',
  'arm'
] as const

export enum PrismaGeneralCommand {
  // VERSION = 'version',
  // INIT = 'init',
  GENERATE = 'generate',
  // INTROSPECT = 'introspect',
  VALIDATE = 'validate',
  FORMAT = 'format'
}

export enum PrismaDbCommand {
  PULL = 'db pull',
  PUSH = 'db push',
  SEED = 'db seed',
  EXECUTE = 'db execute'
}

export enum PrismaMigrateCommand {
  DEV = 'migrate dev',
  RESET = 'migrate reset',
  DEPLOY = 'mirgrate deploy',
  RESOLVE = 'migrate resolve'
  // STATUS = 'migrate status'
}

export enum PrismaDbExecuteCommandInput {
  STDIN = '--stdin',
  FILE = '--file'
}
