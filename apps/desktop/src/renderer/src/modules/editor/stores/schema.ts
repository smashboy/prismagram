import { createEvent, createStore } from 'effector'
import { PrismaSchemaState } from 'prisma-state'

export const setPrismaSchemaEvent = createEvent<PrismaSchemaState>()
export const updatePrismaSchemaEvent = createEvent()

export const $schemaState = createStore(new PrismaSchemaState())
  .on(setPrismaSchemaEvent, (_, state) => state)
  .on(updatePrismaSchemaEvent, (state) => state._clone())

export const $schemaModels = $schemaState.map(({ models }) => models)

// export const $selectedSchemaModel = combine([$schemaModels, $selectedNodeId]).map(([models, id]) =>
//   id ? models.get(id.nodeId)! : null
// )

export const $schemaEnums = $schemaState.map(({ enums }) => enums)

export const $schemaDatasources = $schemaState.map(({ datasource }) => [datasource])

export const $schemaGenerators = $schemaState.map(({ generators }) => generators)

export const $modelIds = $schemaModels.map((models) => [...models.keys()])
export const $schemaEnumIds = $schemaEnums.map((enums) => [...enums.keys()])

export const $schemaDatasourceIds = $schemaDatasources.map((datasources) => [...datasources.keys()])
export const $schemaGeneratorIds = $schemaGenerators.map((generators) => [...generators.keys()])
