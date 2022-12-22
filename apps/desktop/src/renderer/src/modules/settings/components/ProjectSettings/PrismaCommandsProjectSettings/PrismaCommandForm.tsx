import { Select, SelectItem, Stack, Switch, TextInput } from '@mantine/core'
import { SelectItemWithDescription } from '@renderer/core/components'
import {
  PrismaDbCommand,
  PrismaGeneralCommand,
  PrismaMigrateCommand
} from '@shared/common/configs/prisma'
import { useState } from 'react'
import { PrismaDbExecuteCmdOptions } from './commandOptions/PrismaDbExecuteCmdOptions'
import { PrismaDbPullCmdOptions } from './commandOptions/PrismaDbPullCmdOptions'
import { PrismaDbPushCmdOptions } from './commandOptions/PrismaDbPushCmdOptions'
import { PrismaGenerateCmdOptions } from './commandOptions/PrismaGenerateCmdOptions'
import { PrismaMigrateDevCmdOptions } from './commandOptions/PrismaMigrateDevCmdOptions'
import { PrismaMigrateResetCommandOptions } from './commandOptions/PrismaMigrateResetCommandOptions'
import { PrismaMigrateResolveCmdOptions } from './commandOptions/PrismaMigrateResolveCmdOptions'

const commandOptions: SelectItem[] = [
  // {
  //   value: PrismaGeneralCommand.FORMAT,
  //   description:
  //     'Formats the Prisma schema file, which includes validating, formatting, and persisting the schema.'
  // },
  {
    value: PrismaGeneralCommand.GENERATE,
    description:
      'Generates assets like Prisma Client based on the generator and data model blocks defined in your prisma schema file.'
  },
  // {
  //   value: PrismaGeneralCommand.VALIDATE,
  //   description: 'Validates the Prisma Schema Language of the Prisma schema file.'
  // },
  {
    value: PrismaDbCommand.EXECUTE,
    description:
      'This command applies a SQL script to the database without interacting with the Prisma migrations table. This command is currently not supported on MongoDB.'
  },
  {
    value: PrismaDbCommand.PULL,
    description:
      'Connects to your database and adds Prisma models to your Prisma schema that reflect the current database schema.'
  },
  {
    value: PrismaDbCommand.PUSH,
    description:
      'Pushes the state of your Prisma schema file to the database without using migrations. It creates the database if the database does not exist.'
  },
  { value: PrismaDbCommand.SEED, description: '' },
  {
    value: PrismaMigrateCommand.DEV,
    description:
      'Updates your database using migrations during development and creates the database if it does not exist.'
  },
  {
    value: PrismaMigrateCommand.RESET,
    description:
      "Deletes and recreates the database, or performs a 'soft reset' by removing all data, tables, indexes, and other artifacts."
  },
  {
    value: PrismaMigrateCommand.DEPLOY,
    description:
      'Applies all pending migrations, and creates the database if it does not exist. Primarily used in non-development environments.'
  },
  {
    value: PrismaMigrateCommand.RESOLVE,
    description:
      'Allows you to solve migration history issues in production by marking a failed migration as already applied (supports baselining) or rolled back.'
  }
]

const commandSettingsOptions = {
  // [PrismaGeneralCommand.FORMAT]: PrismaFormatCmdOptions,
  // [PrismaGeneralCommand.VALIDATE]: PrismaValidateCmdOptions,
  [PrismaGeneralCommand.GENERATE]: PrismaGenerateCmdOptions,
  [PrismaDbCommand.EXECUTE]: PrismaDbExecuteCmdOptions,
  [PrismaDbCommand.PULL]: PrismaDbPullCmdOptions,
  [PrismaDbCommand.PUSH]: PrismaDbPushCmdOptions,
  [PrismaMigrateCommand.DEV]: PrismaMigrateDevCmdOptions,
  [PrismaMigrateCommand.RESET]: PrismaMigrateResetCommandOptions,
  [PrismaMigrateCommand.RESOLVE]: PrismaMigrateResolveCmdOptions
}

export const PrismaCommandForm = () => {
  const [command, setCommand] = useState<PrismaGeneralCommand | PrismaDbCommand | null | string>(
    null
  )

  const SelectedCmdOptions = command ? commandSettingsOptions[command] : null

  return (
    <Stack>
      <TextInput label="Command name" required />
      <Switch
        label="Is default command"
        description="Is this command will be default option to run on script button."
      />
      <Select
        label="Select command"
        value={command}
        onChange={setCommand}
        data={commandOptions}
        itemComponent={SelectItemWithDescription}
        required
        // searchable
      />
      {SelectedCmdOptions && <SelectedCmdOptions />}
    </Stack>
  )
}
