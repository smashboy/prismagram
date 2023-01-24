export const ScalarType = {
  STRING: 'String',
  BOOLEAN: 'Boolean',
  INT: 'Int',
  BIG_INT: 'BigInt',
  FLOAT: 'Float',
  DECIMAL: 'Decimal',
  DATE_TIME: 'DateTime',
  JSON: 'Json',
  BYTES: 'Bytes'
} as const

export type ScalarTypeOption = typeof ScalarType[keyof typeof ScalarType]

export const scalarOptionsArray = [
  ScalarType.BIG_INT,
  ScalarType.BOOLEAN,
  ScalarType.BYTES,
  ScalarType.DATE_TIME,
  ScalarType.DECIMAL,
  ScalarType.FLOAT,
  ScalarType.INT,
  ScalarType.JSON,
  ScalarType.STRING
] as const

export const ReferentialAction = {
  CASCADE: 'Cascade',
  RESTRICT: 'Restrict',
  NO_ACTION: 'NoAction',
  SET_NULL: 'SetNull',
  SET_DEFAULT: 'SetDefault'
} as const

export type ReferentialActionOption = typeof ReferentialAction[keyof typeof ReferentialAction]

export const prismaRelationModesList = ['foreignKeys', 'prisma'] as const
export const prismaEngineTypesList = ['binary', 'dataproxy', 'library'] as const

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

export const attributeFunctionsList = [
  'auto',
  'autoincrement',
  'cuid',
  'dbgenerated',
  'now',
  'sequence',
  'uuid'
] as const

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
