import { Select, SelectItem, Stack, TextInput } from '@mantine/core'
import { SelectItemWithDescription } from '@renderer/core/components'
import { PrismaDbExecuteCommandInput } from '@shared/common/configs/prisma'
import { PrismaDbExecuteCommand } from '@shared/common/models/Prisma'
import { PrismaCmdOptionsProps } from './types'

const executeCommandInputOptions: SelectItem[] = [
  {
    label: PrismaDbExecuteCommandInput.FILE,
    value: PrismaDbExecuteCommandInput.FILE,
    description: 'Path to a file. The content will be sent as the script to be executed'
  },
  {
    label: PrismaDbExecuteCommandInput.STDIN,
    value: PrismaDbExecuteCommandInput.STDIN,
    description: 'Use the terminal standard input as the script to be executed'
  }
]

export const PrismaDbExecuteCmdOptions: React.FC<
  PrismaCmdOptionsProps<Pick<PrismaDbExecuteCommand, 'input' | 'url'>>
> = ({ value: options = {}, onChange }) => {
  const { url = '', input = null } = options

  const handleUrlInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...options, url: event.target.value })

  const handleSelectInput = (value: PrismaDbExecuteCommandInput) =>
    onChange({ ...options, input: value })

  return (
    <Stack>
      <TextInput
        label="Url"
        value={url}
        onChange={handleUrlInput}
        description="URL of the data source to run the command on."
        required
      />
      {/* <TextInput
        label="Schema"
        description="Path to a Prisma schema file, uses the URL in the datasource block."
        required
      /> */}
      <Select
        label="Script input"
        description="One of the following script inputs is required."
        value={input}
        onChange={handleSelectInput}
        data={executeCommandInputOptions}
        itemComponent={SelectItemWithDescription}
        required
      />
    </Stack>
  )
}
