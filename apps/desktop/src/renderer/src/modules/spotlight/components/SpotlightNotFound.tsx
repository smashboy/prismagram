import { Stack, Text } from '@mantine/core'
import { IconBulbOff } from '@tabler/icons'
import { Command } from 'cmdk'

export const SpotlightNotFound = () => (
  <Command.Empty>
    <Stack p="md" align="center">
      <IconBulbOff size={32} />
      <Text>No results found</Text>
    </Stack>
  </Command.Empty>
)
