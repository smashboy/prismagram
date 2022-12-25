import { sample } from 'effector'
import { loadDiagramEvent } from './diagram'
import { launchPrismaStudioEffect, layoutDiagramEffect, loadEditorDataEffect } from './effects'
import { setPrismaSchema } from './schema'
import { PrismaStudioGate } from './ui'

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

sample({
  source: PrismaStudioGate.state,
  filter: (project) => !!project,
  target: launchPrismaStudioEffect
})
