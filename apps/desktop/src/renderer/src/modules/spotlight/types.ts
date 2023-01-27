export interface Shortcut {
  keys: string[]
  isCtrlOrCmd?: boolean
  onExecute: () => void
  name: string
  description?: string
}
