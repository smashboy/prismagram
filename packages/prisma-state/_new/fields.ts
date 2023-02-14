import { Field as AstField } from '@mrleebo/prisma-ast/src/getSchema'
import { ScalarTypeOption } from '../constants'
import { Field, EnvField, OptionField, OptionsListField, ScalarField, ModelField } from './types'
import { cleanupStr, parseModelField } from './utils'

export const envField = (
  name: string,
  field: EnvField = {
    name,
    value: '',
    isEnv: true
  }
) => {
  const toggleIsEnv = (isEnv?: boolean) => {
    field.isEnv = isEnv ?? !field.isEnv
  }

  const _parse = (args: string[] = []) => {
    const value = args[0]
    if (value) field.value = cleanupStr(value)
  }

  const _toString = () => {
    return `${field.name} = ${field.isEnv ? `env("${field.value}")` : `"${field.value}"`}`
  }

  return { field, toggleIsEnv, _parse, _toString }
}

export const optionField = (
  name: string,
  field: OptionField = {
    name,
    value: ''
  }
) => {
  const _parse = (value = '') => {
    field.value = cleanupStr(value)
  }

  const _toString = () => {
    return `${field.name} = "${field.value}"`
  }

  return { field, _parse, _toString }
}

export const optionsListField = (
  name: string,
  field: OptionsListField = {
    name,
    options: new Set()
  }
) => {
  const _parse = (args: string[] = []) => {
    args.forEach((arg) => field.options.add(arg))
  }

  const _toString = () => {
    return `${field.name} = [${[...field.options.values()]
      .map((option) => `"${option}"`)
      .join(', ')}]`
  }

  return { field, _parse, _toString }
}

export const enumField = (
  option: string,
  field: Field = {
    name: option
  }
) => {
  const _toString = () => {
    return field.name
  }

  return { field, _toString }
}

export const enumModelField = (
  name: string,
  type: string,
  field: ModelField = {
    name,
    type,
    modifier: null,
    attributes: new Map()
  }
) => {
  const _parse = (data: AstField) => parseModelField(field, data)

  return { field, _parse }
}

export const scalarField = (
  name: string,
  type: ScalarTypeOption,
  field: ScalarField = {
    name,
    type,
    modifier: null,
    attributes: new Map()
  }
) => {
  const _parse = (data: AstField) => parseModelField(field, data)

  return { field, _parse }
}

export const relationField = (
  name: string,
  type: string,
  field: ModelField = {
    name,
    type,
    modifier: null,
    attributes: new Map()
  }
) => {
  const _parse = (data: AstField) => parseModelField(field, data)

  return { field, _parse }
}
