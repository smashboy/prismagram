import {
  Button,
  Group,
  LoadingOverlay,
  Select,
  SelectItem,
  Stack,
  Switch,
  TextInput
} from '@mantine/core'
import { SelectItemWithDescription } from '@renderer/core/components'
import {
  PrismaDbCommand,
  PrismaGeneralCommand,
  PrismaMigrateCommand
} from '@shared/common/configs/prisma'
import { PrismaCommand } from '@shared/common/models/Prisma'
import React, { useState } from 'react'
import { PrismaDbExecuteCmdOptions } from './commandOptions/PrismaDbExecuteCmdOptions'
import { PrismaDbPullCmdOptions } from './commandOptions/PrismaDbPullCmdOptions'
import { PrismaDbPushCmdOptions } from './commandOptions/PrismaDbPushCmdOptions'
import { PrismaGenerateCmdOptions } from './commandOptions/PrismaGenerateCmdOptions'
import { PrismaMigrateDevCmdOptions } from './commandOptions/PrismaMigrateDevCmdOptions'
import { PrismaMigrateResetCommandOptions } from './commandOptions/PrismaMigrateResetCommandOptions'
import { PrismaMigrateResolveCmdOptions } from './commandOptions/PrismaMigrateResolveCmdOptions'

interface PrismaCommandFormProps {
  onClose?: () => void
  onSubmit?: (command: PrismaCommand) => void
  isLoading?: boolean
  defaultValues?: PrismaCommand
  customActions?: React.ReactNode
}

const commandOptions: SelectItem[] = [
  // {
  //   value: PrismaGeneralCommand.FORMAT,
  //   description:
  //     'Formats the Prisma schema file, which includes validating, formatting, and persisting the schema.'
  // },
  {
    label: PrismaGeneralCommand.GENERATE,
    value: PrismaGeneralCommand.GENERATE,
    description:
      'Generates assets like Prisma Client based on the generator and data model blocks defined in your prisma schema file.'
  },
  // {
  //   value: PrismaGeneralCommand.VALIDATE,
  //   description: 'Validates the Prisma Schema Language of the Prisma schema file.'
  // },
  {
    label: PrismaDbCommand.EXECUTE,
    value: PrismaDbCommand.EXECUTE,
    description:
      'This command applies a SQL script to the database without interacting with the Prisma migrations table. This command is currently not supported on MongoDB.'
  },
  {
    label: PrismaDbCommand.PULL,
    value: PrismaDbCommand.PULL,
    description:
      'Connects to your database and adds Prisma models to your Prisma schema that reflect the current database schema.'
  },
  {
    label: PrismaDbCommand.PUSH,
    value: PrismaDbCommand.PUSH,
    description:
      'Pushes the state of your Prisma schema file to the database without using migrations. It creates the database if the database does not exist.'
  },
  { label: PrismaDbCommand.SEED, value: PrismaDbCommand.SEED, description: '' },
  {
    label: PrismaMigrateCommand.DEV,
    value: PrismaMigrateCommand.DEV,
    description:
      'Updates your database using migrations during development and creates the database if it does not exist.'
  },
  {
    label: PrismaMigrateCommand.RESET,
    value: PrismaMigrateCommand.RESET,
    description:
      "Deletes and recreates the database, or performs a 'soft reset' by removing all data, tables, indexes, and other artifacts."
  },
  {
    label: PrismaMigrateCommand.DEPLOY,
    value: PrismaMigrateCommand.DEPLOY,
    description:
      'Applies all pending migrations, and creates the database if it does not exist. Primarily used in non-development environments.'
  },
  {
    label: PrismaMigrateCommand.RESOLVE,
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

export const PrismaCommandForm: React.FC<PrismaCommandFormProps> = ({
  onClose,
  onSubmit,
  isLoading = false,
  defaultValues = { command: null, name: '' },
  customActions
}) => {
  const { command: initialCommand, name: initialName, ...initialOptions } = defaultValues

  const [command, setCommand] = useState<
    PrismaGeneralCommand | PrismaDbCommand | PrismaMigrateCommand | null | string
  >(initialCommand)

  const [name, setName] = useState(initialName)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [options, setOptions] = useState<Record<string, string | boolean>>(initialOptions)

  const disableSaveButton = !name || !command

  const SelectedCmdOptions = command ? commandSettingsOptions[command] : null

  const handleInputName = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value)

  const handleSelectCommand = (
    value: PrismaGeneralCommand | PrismaDbCommand | PrismaMigrateCommand | null | string
  ) => {
    setCommand(value)
    setOptions({})
  }

  const handleSubmitCommand = () => onSubmit?.({ name, command: command!, ...options })

  return (
    <Stack pos="relative">
      <LoadingOverlay visible={isLoading} />
      <TextInput label="Command name" value={name} onChange={handleInputName} required />
      <Switch
        label="Is default command"
        description="Is this command will be default option to run on script button."
      />
      <Select
        label="Select command"
        value={command}
        onChange={handleSelectCommand}
        data={commandOptions}
        itemComponent={SelectItemWithDescription}
        // filter={customSelectFilter}
        required
        // searchable
      />
      {SelectedCmdOptions && <SelectedCmdOptions value={options} onChange={setOptions} />}
      <Group position="right">
        {customActions}
        {onClose && (
          <Button onClick={onClose} variant="subtle" color="gray">
            Close
          </Button>
        )}
        <Button variant="filled" onClick={handleSubmitCommand} disabled={disableSaveButton}>
          Save
        </Button>
      </Group>
    </Stack>
  )
}
