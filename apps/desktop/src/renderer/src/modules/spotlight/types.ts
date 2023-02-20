import { TablerIcon } from '@tabler/icons'

export interface Shortcut {
  keys: string[]

  onExecute: () => void
  name: string
  description?: string
  icon?: TablerIcon
}
