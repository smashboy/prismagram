export enum PrismaDatasourceProvider {
  POSTGRESQL = 'postgresql',
  MYSQL = 'mysql',
  SQLLITE = 'sqlite',
  SQLSERVER = 'sqlserver',
  MONGODB = 'mongodb',
  COCKROACHDB = 'cockroachdb'
}

export const prismaDatasourceProvidersArray = [
  PrismaDatasourceProvider.COCKROACHDB,
  PrismaDatasourceProvider.MONGODB,
  PrismaDatasourceProvider.MYSQL,
  PrismaDatasourceProvider.POSTGRESQL,
  PrismaDatasourceProvider.SQLLITE,
  PrismaDatasourceProvider.SQLSERVER
]

export enum PrismaDatasourceRelationMode {
  FOREIGN_KEYS = 'foreignKeys',
  PRISMA = 'prisma'
}

export const prismaDatasourceRelationModesArray = [
  PrismaDatasourceRelationMode.FOREIGN_KEYS,
  PrismaDatasourceRelationMode.PRISMA
]

export enum PrismaGeneratorProvider {
  PRISMA_CLIENT_JS = 'prisma-client-js'
}
