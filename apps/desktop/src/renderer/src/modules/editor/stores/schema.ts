import { createEvent, createStore } from 'effector'
import { extractBlocksByType } from './utils'
import { PrismaSchemaState } from 'prisma-state'
import { Datasource, Generator } from 'prisma-state/blocks'

export const setPrismaSchemaEvent = createEvent<PrismaSchemaState>()

export const $schemaState = createStore(new PrismaSchemaState()).on(
  setPrismaSchemaEvent,
  (_, state) => state
)

export const $schemaModels = $schemaState.map(({ models }) => models)

// export const $selectedSchemaModel = combine([$schemaModels, $selectedNodeId]).map(([models, id]) =>
//   id ? models.get(id.nodeId)! : null
// )

export const $schemaEnums = $schemaState.map(({ enums }) => enums)

export const $schemaDatasources = $schemaState.map(({ state }) =>
  extractBlocksByType<Datasource>('datasource', state)
)

export const $schemaGenerators = $schemaState.map(({ state }) =>
  extractBlocksByType<Generator>('generator', state)
)

export const $modelIds = $schemaModels.map((models) => [...models.keys()])
export const $schemaEnumIds = $schemaEnums.map((enums) => [...enums.keys()])

export const $schemaDatasourceIds = $schemaDatasources.map((datasources) => [...datasources.keys()])
export const $schemaGeneratorIds = $schemaGenerators.map((generators) => [...generators.keys()])
