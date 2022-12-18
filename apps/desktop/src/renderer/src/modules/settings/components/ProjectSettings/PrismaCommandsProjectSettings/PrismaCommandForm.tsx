import { Select, Stack, Switch, TextInput } from '@mantine/core'
import { PrismaDbCommand, PrismaGeneralCommand } from '@shared/common/configs/prisma'
import { useState } from 'react'
import { PrismaDbExecuteCmdOptions } from './commandOptions/PrismaDbExecuteCmdOptions'
import { PrismaGenerateCmdOptions } from './commandOptions/PrismaGenerateCmdOptions'

const commandOptions = [
  PrismaGeneralCommand.FORMAT,
  PrismaGeneralCommand.GENERATE,
  PrismaGeneralCommand.INTROSPECT,
  PrismaGeneralCommand.VALIDATE,
  PrismaDbCommand.EXECUTE,
  PrismaDbCommand.PULL,
  PrismaDbCommand.PUSH,
  PrismaDbCommand.SEED
]

const commandSettingsOptions = {
  // [PrismaGeneralCommand.FORMAT]: PrismaFormatCmdOptions,
  // [PrismaGeneralCommand.VALIDATE]: PrismaValidateCmdOptions,
  [PrismaGeneralCommand.GENERATE]: PrismaGenerateCmdOptions,
  [PrismaDbCommand.EXECUTE]: PrismaDbExecuteCmdOptions
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
        required
        searchable
      />
      {SelectedCmdOptions && <SelectedCmdOptions />}
    </Stack>
  )
}
