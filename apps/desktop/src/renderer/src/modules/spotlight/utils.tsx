import { Shortcut, SpotlightAction } from './types'

export const createShortcutString = (shortcut: Shortcut) => `${shortcut.keys.join('+')}`

export const shortcut2SpotlightAction = (
  { name, onExecute, icon: Icon }: Shortcut,
  group?: string
): SpotlightAction => ({
  title: name,
  onTrigger: onExecute,
  icon: Icon && <Icon size={18} />,
  group
})
