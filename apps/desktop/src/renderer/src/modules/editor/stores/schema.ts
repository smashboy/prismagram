import { combine, createEvent, createStore } from 'effector'
import { Datasource, Enum, getSchema, Model, Generator } from '@mrleebo/prisma-ast'
import { $selectedModelId } from './ui'

export const setPrismaSchema = createEvent<string>()

export const $schema = createStore<string>('').on(setPrismaSchema, (_, schema) => schema)

export const $schemaDataModel = $schema.map((schema) => getSchema(schema))

export const $schemaModels = $schemaDataModel.map(({ list }) => {
  const models = new Map<string, Model>()

  for (const block of list) {
    if (block.type === 'model') models.set(block.name, block)
  }

  return models
})

export const $selectedSchemaModel = combine([$schemaModels, $selectedModelId]).map(([models, id]) =>
  id ? models.get(id)! : null
)

export const $schemaEnums = $schemaDataModel.map(({ list }) => {
  const models = new Map<string, Enum>()

  for (const block of list) {
    if (block.type === 'enum') models.set(block.name, block)
  }

  return models
})

export const $schemaDatasources = $schemaDataModel.map(({ list }) => {
  const models = new Map<string, Datasource>()

  for (const block of list) {
    if (block.type === 'datasource') models.set(block.name, block)
  }

  return models
})

export const $schemaGenerators = $schemaDataModel.map(({ list }) => {
  const models = new Map<string, Generator>()

  for (const block of list) {
    if (block.type === 'generator') models.set(block.name, block)
  }

  return models
})

// TODO: move to common
export const $schemaEnumIds = $schemaEnums.map((models) => [...models.keys()])

export const $schemaDatasourceIds = $schemaDatasources.map((models) => [...models.keys()])
export const $schemaGeneratorIds = $schemaGenerators.map((models) => [...models.keys()])
