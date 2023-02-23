import { Card, Group, Stack, Text } from '@mantine/core'
import { Shortcut } from '@renderer/modules/spotlight'
import { KbdShortcut } from '@renderer/modules/spotlight'

interface ShortcutItemProps {
  shortcut: Shortcut
}

export const ShortcutItem: React.FC<ShortcutItemProps> = ({ shortcut }) => {
  const { name, keys, description } = shortcut

  return (
    <Card sx={{ userSelect: 'none' }} bg="gray.0" withBorder>
      <Group position="apart">
        <Stack spacing={0}>
          <Text>{name}</Text>
          {description && (
            <Text color="dimmed" size="sm">
              {description}
            </Text>
          )}
        </Stack>
        <KbdShortcut keys={keys} />
      </Group>
    </Card>
  )
}
