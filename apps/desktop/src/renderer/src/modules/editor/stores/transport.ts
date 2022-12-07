import { sample } from 'effector'
import { loadDiagramEvent } from './diagram'
import { loadEditorDataEffect } from './effects'
import { setPrismaSchema } from './schema'

sample({
  source: loadEditorDataEffect.doneData,
  fn: (data) => data.diagram,
  target: loadDiagramEvent
})

sample({
  clock: loadEditorDataEffect.doneData,
  fn: (data) => data.schema,
  target: setPrismaSchema
})
