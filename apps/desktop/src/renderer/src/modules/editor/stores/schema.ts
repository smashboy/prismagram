import { combine, createEvent, createStore } from 'effector'
import { Datasource, Enum, getSchema, Model, Generator } from '@mrleebo/prisma-ast'
import { $selectedModelId } from './ui'
import { extractBlocksByType } from './utils'

export const setPrismaSchema = createEvent<string>()

export const $schema = createStore<string>('').on(setPrismaSchema, (_, schema) => schema)

export const $schemaDataModel = $schema.map((schema) => getSchema(schema))

export const $schemaModels = $schemaDataModel.map(({ list }) => {
  const models = new Map<string, Model>()

  for (const block of list) {
    if (block.type === 'model') models.set(block.name, block)
  }

  console.log(models)

  return models
})

export const $selectedSchemaModel = combine([$schemaModels, $selectedModelId]).map(([models, id]) =>
  id ? models.get(id)! : null
)

export const $schemaEnums = $schemaDataModel.map(({ list }) =>
  extractBlocksByType<Enum>('enum', list)
)

export const $schemaDatasources = $schemaDataModel.map(({ list }) =>
  extractBlocksByType<Datasource>('datasource', list)
)

export const $schemaGenerators = $schemaDataModel.map(({ list }) =>
  extractBlocksByType<Generator>('generator', list)
)

// TODO: move to common
export const $schemaEnumIds = $schemaEnums.map((models) => [...models.keys()])

export const $schemaDatasourceIds = $schemaDatasources.map((models) => [...models.keys()])
export const $schemaGeneratorIds = $schemaGenerators.map((models) => [...models.keys()])
