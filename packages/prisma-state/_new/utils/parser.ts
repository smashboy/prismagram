import {
  Field as AstField,
  AttributeArgument as AstAttributeArgument,
  ModelAttribute as AstModelAttribute,
  GroupedModelAttribute as AstGroupedModelAttribute,
  KeyValue
} from '@mrleebo/prisma-ast/src/getSchema'
import {
  AttributeFunction,
  AttributeFunctionType,
  BlockAttribute,
  FieldAttribute,
  Model,
  ModelField,
  ScalarField
} from '../types'
import { blockAttributesMap, fieldAttributeMap } from './constants'
import { createModelFieldDisplayType } from './field'

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
        type: arg.name as AttributeFunctionType,
        isAttributeFunction: true
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

export const attributeToString = (attr: BlockAttribute | FieldAttribute) => {
  const args: Array<[string, string]> = []

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const _argument2String = (arg: unknown) => {
    if (typeof arg === 'string' || typeof arg === 'boolean' || typeof arg === 'number') return arg
    if (arg instanceof Array) return `[${arg.map(_argument2String).join(', ')}]`
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (arg?.isAttributeFunction) return `${arg.type}()`
  }

  for (const [name, arg] of attr.arguments.entries()) {
    const strArg = _argument2String(arg)

    if (strArg) args.push([name as unknown as string, strArg])
  }

  return `${attr._prefix}${attr.type}${
    args.length > 0 ? `(${args.map(([name, arg]) => `${name}: ${arg}`).join(', ')})` : ''
  }`
}

export const modelFieldToString = (field: ScalarField | ModelField) => {
  return `${field.name} ${createModelFieldDisplayType(field)} ${[...field.attributes.values()]
    .map((attr) => attributeToString(attr))
    .join(' ')}`
}
