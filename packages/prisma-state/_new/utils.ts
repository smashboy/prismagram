import {
  Datasource as AstDatasource,
  Generator as AstGenerator,
  Field as AstField
} from '@mrleebo/prisma-ast/src/getSchema'
import { ScalarTypeOption } from '../constants'
import {
  enumModelField,
  envField,
  optionField,
  optionsListField,
  relationField,
  scalarField
} from './fields'
import {
  BlockType,
  Datasource,
  Enum,
  Generator,
  Model,
  ModelField,
  PrismaSchemaStateData
} from './types'

const datasourceEnvFields = ['url', 'shadowDatabaseUrl']
const generatorEnvFields = ['provider', 'output']

export const parseAssignments = (
  block: Datasource | Generator,
  list: (AstGenerator | AstDatasource)['assignments'] = []
) => {
  for (const assignment of list) {
    if (assignment.type !== 'assignment') continue

    const { key, value } = assignment

    if (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (value?.type === 'function' && value?.name === 'env') ||
      (block.type === 'datasource' && datasourceEnvFields.includes(key)) ||
      (block.type === 'generator' && generatorEnvFields.includes(key))
    ) {
      const field = envField(key)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      field._parse(value?.params ?? [value])

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (!value?.params) {
        field.field.isEnv = false
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      block.fields.set(field.field.name, field.field)
      continue
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (value?.type === 'array') {
      const field = optionsListField(key)

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      field._parse(value.args)

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      block.fields.set(field.field.name, field.field)
      continue
    }

    const field = optionField(key)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    field._parse(value)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    block.fields.set(field.field.name, field.field)
  }
}

export const parseModelField = (field: ModelField, data: AstField) => {
  const { array = false, optional = false, attributes = [] } = data

  if (array) field.modifier = 'list'
  if (optional) field.modifier = 'optional'

  // for (const { name, args = [] } of attributes) {
  // }
}

export const addOptionField = (key: string, value: string, block: Generator | Datasource) => {
  const { field } = envField(key)
  field.value = value

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  block.fields.set(key, field)
}

export const addEnvField = (
  key: string,
  url: string,
  isEnv = true,
  block: Generator | Datasource
) => {
  const { field } = envField(key)
  field.value = url
  field.isEnv = isEnv

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  block.fields.set(key, field)
}

export const addOptionsListField = (
  key: string,
  values: string[],
  block: Generator | Datasource
) => {
  const { field } = optionsListField(key)
  values.forEach((value) => field.options.add(value))

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  block.fields.set(key, field)
}

export const extractBlockIdsByType = (type: BlockType, state: PrismaSchemaStateData) => {
  const ids: string[] = []

  for (const block of [...state.values()]) {
    if (block.type === type) ids.push(block.name)
  }

  return ids
}

export const extractBlocksByType = <B extends Datasource | Enum | Generator | Model>(
  type: BlockType,
  list: PrismaSchemaStateData
): Map<string, B> => {
  const blocks = new Map<string, B>()

  for (const block of [...list.values()]) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (block.type === type) blocks.set(block.name, block)
  }

  return blocks
}

export const cleanupStr = (value: string) => value.replace(/"/g, '')

export const uncapitalize = (str: string) => str.charAt(0).toLowerCase() + str.slice(1)
export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export const createFieldFromType = (
  name: string,
  type: string,
  enumIds: string[],
  modelIds: string[]
) => {
  if (enumIds.indexOf(type) > -1) return enumModelField(name, type)

  if (modelIds.indexOf(type) > -1) return relationField(name, type)

  return scalarField(name, type as ScalarTypeOption)
}
