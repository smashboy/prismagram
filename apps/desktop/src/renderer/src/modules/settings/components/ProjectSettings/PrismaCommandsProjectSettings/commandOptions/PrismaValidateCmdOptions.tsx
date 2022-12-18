import { Stack, TextInput } from '@mantine/core'

export const PrismaValidateCmdOptions = () => {
  return (
    <Stack>
      <TextInput
        label="Schema path"
        description="Specifies the path to the desired schema.prisma file to be processed instead of the default path. Both absolute and relative paths are supported."
      />
    </Stack>
  )
}
