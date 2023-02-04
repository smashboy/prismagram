export const DEFAULT_PRISMA_STUDIO_PORT = 5555

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

export const defaultSchemaPaths = {
  root: './schema.prisma',
  prismaRoot: './prisma/schema.prisma'
}
