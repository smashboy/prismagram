import { Select, SelectItem, Stack, TextInput } from '@mantine/core'
import { SelectItemWithDescription } from '@renderer/core/components'
import { PrismaDbExecuteCommandInput } from '@shared/common/configs/prisma'

const executeCommandInputOptions: SelectItem[] = [
  {
    value: PrismaDbExecuteCommandInput.FILE,
    description: 'Path to a file. The content will be sent as the script to be executed'
  },
  {
    value: PrismaDbExecuteCommandInput.STDIN,
    description: 'Use the terminal standard input as the script to be executed'
  }
]

export const PrismaDbExecuteCmdOptions = () => {
  return (
    <Stack>
      <TextInput label="Url" description="URL of the data source to run the command on." required />
      <TextInput
        label="Schema"
        description="	Path to a Prisma schema file, uses the URL in the datasource block."
        required
      />
      <Select
        label="Script input"
        description="One of the following script inputs is required."
        data={executeCommandInputOptions}
        itemComponent={SelectItemWithDescription}
        required
      />
    </Stack>
  )
}
