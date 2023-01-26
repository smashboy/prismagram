import { combine, createEvent, createStore } from 'effector'
import { $selectedModelId } from './ui'
import { extractBlocksByType } from './utils'
import { PrismaSchemaState } from 'prisma-state'
import { Datasource, Generator } from 'prisma-state/blocks'

export const setPrismaSchemaEvent = createEvent<string>()

export const $schema = createStore<string>('').on(setPrismaSchemaEvent, (_, schema) => schema)

export const $schemaState = $schema.map((schema) => {
  const state = new PrismaSchemaState()
  state.fromString(schema)

  console.log(state)

  return state
})

export const $schemaModels = $schemaState.map(({ models }) => models)

export const $selectedSchemaModel = combine([$schemaModels, $selectedModelId]).map(([models, id]) =>
  id ? models.get(id)! : null
)

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
