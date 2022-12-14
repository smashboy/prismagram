import { Diagram } from './Diagram'
import { ProjectSettings } from './Project'

export interface EditorData {
  diagram: Diagram
  schema: string
  settings: ProjectSettings
}
