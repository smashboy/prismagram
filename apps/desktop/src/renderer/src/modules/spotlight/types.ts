import { SpotlightAction as MSpotlightAction } from '@mantine/spotlight'
import { TablerIcon } from '@tabler/icons'

export interface Shortcut {
  keys: string[]
  onExecute: () => void
  name: string
  description?: string
  icon?: TablerIcon
}

export interface SpotlightAction extends Omit<MSpotlightAction, 'onTrigger'> {
  onTrigger?: () => void
  actions?: SpotlightAction[]
  shortcut?: string[]
}
