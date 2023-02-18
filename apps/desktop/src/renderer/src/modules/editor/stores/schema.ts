import { createHistoryStore } from '@renderer/core/effector'
import { createEvent, createStore } from 'effector'
import { createPrismaSchemaState } from 'prisma-state/_new/state'
import { DatasourceData } from 'prisma-state/_new/types'

export const setPrismaSchemaEvent = createEvent<ReturnType<typeof createPrismaSchemaState>>()
export const updatePrismaSchemaEvent = createEvent()

const $schemaStateWritable = createStore(createPrismaSchemaState()).on(
  setPrismaSchemaEvent,
  (_, state) => state
)

const $schemaStateWritableData = $schemaStateWritable.map((state) => state._data())

export const [$currentSchemaHistory, schemaStateHistoryApiEvents, $schemaHistory] =
  createHistoryStore($schemaStateWritableData)

export const $schemaState = $currentSchemaHistory.map((data) => createPrismaSchemaState(data))

export const $schemaModels = $schemaState.map(({ models }) => models)

// export const $selectedSchemaModel = combine([$schemaModels, $selectedNodeId]).map(([models, id]) =>
//   id ? models.get(id.nodeId)! : null
// )

export const $schemaEnums = $schemaState.map(({ enums }) => enums)

export const $schemaDatasources = $schemaState.map(({ datasource }) =>
  datasource ? new Map([[datasource.name, datasource]]) : new Map<string, DatasourceData>()
)

export const $schemaGenerators = $schemaState.map(({ generators }) => generators)

export const $modelIds = $schemaModels.map((models) => [...models.keys()])
export const $schemaEnumIds = $schemaEnums.map((enums) => [...enums.keys()])

export const $schemaDatasourceIds = $schemaDatasources.map((datasources) => [...datasources.keys()])
export const $schemaGeneratorIds = $schemaGenerators.map((generators) => [...generators.keys()])
