import { Shortcut } from './types'

export const createShortcutString = (shortcut: Shortcut) =>
  `${shortcut.isCtrlOrCmd ? 'Ctrl+' : ''}${shortcut.keys.join('+')}`
