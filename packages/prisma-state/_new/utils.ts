import {
  Datasource as AstDatasource,
  Generator as AstGenerator,
  Field as AstField,
  AttributeArgument as AstAttributeArgument,
  ModelAttribute as AstModelAttribute,
  GroupedModelAttribute as AstGroupedModelAttribute,
  KeyValue
} from '@mrleebo/prisma-ast/src/getSchema'
import { ScalarTypeOption } from '../constants'
import {
  defaultAttribute,
  idAttribute,
  idBlockAttribute,
  ignoreAttribute,
  ignoreBlockAttribute,
  indexBlockAttribute,
  mapAttribute,
  mapBlockAttribute,
  relationAttribute,
  uniqueAttribute,
  uniqueBlockAttribute,
  updatedAtAttribute
} from './attributes'
import {
  enumModelField,
  envField,
  optionField,
  optionsListField,
  relationField,
  scalarField
} from './fields'
import {
  AttributeFunction,
  AttributeFunctionType,
  BlockAttribute,
  BlockType,
  Datasource,
  Enum,
  FieldAttribute,
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

const fieldAttributeMap = {
  id: idAttribute,
  default: defaultAttribute,
  updatedAt: updatedAtAttribute,
  ignore: ignoreAttribute,
  relation: relationAttribute,
  unique: uniqueAttribute,
  map: mapAttribute
}

export const parseModelField = (field: ModelField, data: AstField) => {
  const { array = false, optional = false, attributes = [] } = data

  if (array) field.modifier = 'list'
  if (optional) field.modifier = 'optional'

  for (const { name, args = [] } of attributes) {
    const attrFunc = fieldAttributeMap[name as keyof typeof fieldAttributeMap]

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (attrFunc) {
      const attribute = attrFunc()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      attribute._parseArgs?.(args)

      field.attributes.set(name, attribute.attr)
    }
  }
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

export const parseAttributeArgs = (
  args: AstAttributeArgument[],
  attr: BlockAttribute | FieldAttribute,
  firstArgName?: string
) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const _parseSingleArg = (arg: AstAttributeArgument['value']) => {
    if (typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string') return arg

    if (arg instanceof Array) return arg.map(_parseSingleArg)

    if (arg.type === 'function') {
      const func: AttributeFunction = {
        type: arg.name as AttributeFunctionType
      }

      return func
    }

    if (arg.type === 'array') return arg.args.map(_parseSingleArg)
  }

  const _parseKeyValueArg = (arg: KeyValue) => {
    if (arg?.type === 'keyValue') {
      const { key, value } = arg
      const parsedArg = _parseSingleArg(value)

      if (parsedArg) return [key, parsedArg] as const
    }
  }

  for (const index in args) {
    const arg = args[index]

    if (index === '0' && firstArgName && !(arg.value as KeyValue)?.key) {
      const parsedArg = _parseSingleArg(arg.value)
      if (parsedArg) attr.arguments.set(firstArgName, parsedArg)
      continue
    }

    const parsedArg = _parseKeyValueArg(arg.value as KeyValue)

    if (parsedArg) {
      const [name, value] = parsedArg
      attr.arguments.set(name, value)
    }
  }
}

const blockAttributesMap = {
  id: idBlockAttribute,
  ignore: ignoreBlockAttribute,
  unique: uniqueBlockAttribute,
  map: mapBlockAttribute,
  index: indexBlockAttribute
}

export const parseModelBlockAttribute = (
  model: Model,
  attribute: AstModelAttribute | AstGroupedModelAttribute
) => {
  const { name, args } = attribute

  const attrFunc = blockAttributesMap[name as keyof typeof blockAttributesMap]

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (attrFunc) {
    const attribute = attrFunc()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    attribute._parseArgs?.(args)

    model.attributes.set(name, attribute.attr)
  }
}
