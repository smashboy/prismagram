import {
  PrismaDbCommand,
  PrismaDbExecuteCommandInput,
  PrismaGeneralCommand,
  PrismaMigrateCommand
} from '../configs/prisma'

export interface PrismaCommandBase {
  name: string
  command: string
  // isDefault: boolean
}

export interface PrismaCommand extends PrismaCommandBase {
  [key: string]: string | boolean
}

export interface PrismaGenerateCommand extends PrismaCommandBase {
  command: PrismaGeneralCommand.GENERATE
  dataProxy: boolean
  watch: boolean
}

// export interface PrismaIntrospectCommand extends PrismaCommandBase {
//   command: PrismaGeneralCommand.INTROSPECT
// }

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
  // schema: string
  input: PrismaDbExecuteCommandInput
}

export interface PrismaMigrateDevCommand extends PrismaCommandBase {
  command: PrismaMigrateCommand.DEV
  createOnly?: boolean
  skipSeed?: boolean
  skipGenerate?: boolean
}

export interface PrismaMigrateResetCommand extends PrismaCommandBase {
  command: PrismaMigrateCommand.RESET
  force?: boolean
  skipSeed?: boolean
  skipGenerate?: boolean
}

export interface PrismaMigrateDeployCommand extends PrismaCommandBase {
  command: PrismaMigrateCommand.DEPLOY
}

export interface PrismaMigrateResolveCommand extends PrismaCommandBase {
  command: PrismaMigrateCommand.RESOLVE
  applied?: string
  rolledBack?: string
}
