import { combine, createEvent, createStore } from 'effector'
import { $selectedModelId } from './ui'
import { extractBlocksByType } from './utils'
import { PrismaSchemaState } from 'prisma-state'
import { Datasource, Generator } from 'prisma-state/blocks'

export const setPrismaSchema = createEvent<string>()

export const $schema = createStore<string>('').on(setPrismaSchema, (_, schema) => schema)

export const $schemaState = $schema.map((schema) => {
  const state = new PrismaSchemaState()
  state.parseSchemaString(schema)
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

// TODO: move to common
export const $schemaEnumIds = $schemaEnums.map((models) => [...models.keys()])

export const $schemaDatasourceIds = $schemaDatasources.map((models) => [...models.keys()])
export const $schemaGeneratorIds = $schemaGenerators.map((models) => [...models.keys()])
