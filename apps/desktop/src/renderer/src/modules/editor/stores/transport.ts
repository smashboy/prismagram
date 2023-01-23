import { sample } from 'effector'
import { throttle } from 'patronum'
import { loadDiagramEvent } from './diagram'
import {
  launchPrismaStudioEffect,
  layoutDiagramEffect,
  loadEditorDataEffect,
  saveSchemaEffect
} from './effects'
import { $schema, setPrismaSchemaEvent } from './schema'
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
  target: setPrismaSchemaEvent
})

sample({
  source: PrismaStudioGate.state,
  filter: (project) => !!project,
  target: launchPrismaStudioEffect
})

sample({
  source: saveSchemaEffect.doneData,
  filter: (schema) => !!schema,
  target: setPrismaSchemaEvent
})

throttle({
  source: $schema,
  timeout: 1000,
  target: saveSchemaEffect
})
