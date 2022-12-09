import { sample } from 'effector'
import { loadDiagramEvent } from './diagram'
import { layoutDiagramEffect, loadEditorDataEffect } from './effects'
import { setPrismaSchema } from './schema'

sample({
  source: loadEditorDataEffect.doneData,
  fn: (data) => data.diagram,
  target: loadDiagramEvent
})

sample({
  source: layoutDiagramEffect.doneData,
  target: loadDiagramEvent
})

sample({
  source: loadEditorDataEffect.doneData,
  fn: (data) => data.schema,
  target: setPrismaSchema
})
