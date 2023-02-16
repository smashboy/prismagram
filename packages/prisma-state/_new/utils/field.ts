import { ScalarTypeOption } from '../../constants'
import {
  enumModelField,
  envField,
  optionField,
  optionsListField,
  relationField,
  scalarField
} from '../fields'
import { Datasource, Generator, ModelField, ScalarField } from '../types'

export const createFieldFromType = (
  name: string,
  type: string,
  enumIds: string[],
  modelIds: string[],
  field?: ModelField | ScalarField
) => {
  if (enumIds.indexOf(type) > -1) return enumModelField(name, type, field)

  if (modelIds.indexOf(type) > -1) return relationField(name, type, field)

  return scalarField(name, type as ScalarTypeOption, field as ScalarField)
}

export const addOptionField = (key: string, value: string, block: Generator | Datasource) => {
  const { field } = optionField(key)
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

export const createModelFieldDisplayType = (field: ScalarField | ModelField) =>
  `${field.type}${field.modifier === 'list' ? '[]' : field.modifier === 'optional' ? '?' : ''}`
