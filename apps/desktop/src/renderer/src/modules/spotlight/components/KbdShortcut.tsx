import { Group, Kbd } from '@mantine/core'

interface KbdShortcutProps {
  keys: string[]
}

export const KbdShortcut: React.FC<KbdShortcutProps> = ({ keys }) => {
  return (
    <Group>
      {keys.map((key) => (
        <Kbd key={key}>{key}</Kbd>
      ))}
    </Group>
  )
}
