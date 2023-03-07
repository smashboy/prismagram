import { Badge } from '@mantine/core'

interface SpotlightKbdShortcutProps {
  keys: string[]
}

export const SpotlightKbdShortcut: React.FC<SpotlightKbdShortcutProps> = ({ keys }) => (
  <Badge color="gray" radius="sm" size="sm" variant="outline">
    {keys.join('+')}
  </Badge>
)
