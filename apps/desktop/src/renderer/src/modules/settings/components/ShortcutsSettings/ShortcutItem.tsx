import { Card, Group, Kbd, Stack, Text } from '@mantine/core'
import { Shortcut } from '@renderer/modules/spotlight'

interface ShortcutItemProps {
  shortcut: Shortcut
}

export const ShortcutItem: React.FC<ShortcutItemProps> = ({ shortcut }) => {
  const { name, keys, isCtrlOrCmd, description } = shortcut

  return (
    <Card sx={{ userSelect: 'none' }} withBorder>
      <Group position="apart">
        <Stack spacing={0}>
          <Text>{name}</Text>
          {description && (
            <Text color="dimmed" size="sm">
              {description}
            </Text>
          )}
        </Stack>
        <Group>
          {isCtrlOrCmd && <Kbd>Ctrl</Kbd>} +{' '}
          {keys.map((key, index) => (
            <>
              <Kbd key={key}>{key}</Kbd> {index < keys.length - 1 && <>+</>}
            </>
          ))}
        </Group>
      </Group>
    </Card>
  )
}
