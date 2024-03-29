import { sample } from 'effector'
import { throttle } from 'patronum'
import { createPrismaSchemaState } from 'prisma-state/_new/state'
import { setDiagramEvent, prismaState2DiagramEvent, $diagram } from './diagram'
import {
  launchPrismaStudioEffect,
  layoutDiagramEffect,
  loadEditorDataEffect,
  saveDiagramEffect,
  saveSchemaEffect
} from './effects'
import { $schemaState, setPrismaSchemaEvent } from './schema'
import { PrismaStudioGate } from './ui'

sample({
  source: layoutDiagramEffect.doneData,
  target: setDiagramEvent
})

sample({
  source: loadEditorDataEffect.doneData,
  fn: (data) => {
    const state = createPrismaSchemaState()
    state.fromString(data.schema)
    return state
  },
  target: setPrismaSchemaEvent
})

sample({
  source: loadEditorDataEffect.doneData,
  filter: (data) => !!data.diagram,
  fn: (data) => data.diagram,
  target: setDiagramEvent
})

sample({
  source: PrismaStudioGate.state,
  filter: (project) => !!project,
  target: launchPrismaStudioEffect
})

sample({
  source: $schemaState,
  target: prismaState2DiagramEvent
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
throttle({
  source: $schemaState,
  timeout: 1000,
  target: saveSchemaEffect
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
throttle({
  source: $diagram,
  timeout: 1000,
  target: saveDiagramEffect
})
