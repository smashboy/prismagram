import { sample } from 'effector'
import { throttle } from 'patronum'
import { layoutDiagramEvent, prismaState2DiagramEvent } from './diagram'
import {
  launchPrismaStudioEffect,
  layoutDiagramEffect,
  loadEditorDataEffect,
  removeSelectedNodeEffect,
  saveSchemaEffect
} from './effects'
import { $schema, $schemaState, setPrismaSchemaEvent } from './schema'
import { PrismaStudioGate } from './ui'

sample({
  source: layoutDiagramEffect.doneData,
  target: layoutDiagramEvent
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
  source: removeSelectedNodeEffect.doneData,
  filter: (schema): schema is string => !!schema,
  target: setPrismaSchemaEvent
})

sample({
  source: $schemaState,
  target: prismaState2DiagramEvent
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
throttle({
  source: $schema,
  timeout: 1000,
  target: saveSchemaEffect
})
