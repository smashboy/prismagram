import {
  Datasource as AstDatasource,
  Generator as AstGenerator
} from '@mrleebo/prisma-ast/src/getSchema'
import { enumField, envField, optionField, optionsListField } from '../fields'
import {
  Datasource,
  Enum,
  EnvField,
  Field,
  Generator,
  Model,
  ModelField,
  OptionField,
  OptionsListField,
  ScalarField
} from '../types'
import { datasourceEnvFields, generatorEnvFields } from './constants'
import { createFieldFromType } from './field'

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

const settingsFieldMap = {
  env: envField,
  option: optionField,
  list: optionsListField
}

export const getFieldFunc = (
  block: Datasource | Generator | Enum | Model,
  field: ModelField | ScalarField | OptionField | EnvField | OptionsListField | Field,
  enumIds: string[],
  modelIds: string[]
) => {
  if (block.type === 'datasource' || block.type === 'generator') {
    const func = settingsFieldMap[field.type as keyof typeof settingsFieldMap]

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return func(field.name, field)
  }

  if (block.type === 'enum') {
    return enumField(field.name, field)
  }

  return createFieldFromType(field.name, field.type, enumIds, modelIds, field as ModelField)
}
