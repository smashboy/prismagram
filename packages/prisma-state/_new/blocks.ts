import type {
  Datasource as AstDatasource,
  Generator as AstGenerator,
  Enum as AstEnum,
  Model as AstModel
} from '@mrleebo/prisma-ast/src/getSchema'
import { PrismaDatasourceProviderType, PrismaDatasourceRelationModeType } from '../constants'
import { enumField } from './fields'
import { PrismaSchemaState } from './state'
import { Datasource, Enum, Generator, Model } from './types'
import {
  addEnvField,
  addOptionField,
  addOptionsListField,
  createFieldFromType,
  parseAssignments
} from './utils'

export const datasource = (
  name: string,
  block: Datasource = {
    name,
    type: 'datasource',
    fields: new Map()
  }
) => {
  const addProvider = (provider: PrismaDatasourceProviderType) =>
    addOptionField('provider', provider, block)

  const addRelationMode = (provider: PrismaDatasourceRelationModeType) =>
    addOptionField('relationMode', provider, block)

  const addUrl = (url: string, isEnv: boolean) => addEnvField('url', url, isEnv, block)

  const addShadowDatabaseUrl = (url: string, isEnv: boolean) =>
    addEnvField('shadowDatabaseUrl', url, isEnv, block)

  const _parse = (list: (AstGenerator | AstDatasource)['assignments'] = []) =>
    parseAssignments(block, list)

  return { block, addProvider, addShadowDatabaseUrl, addUrl, addRelationMode, _parse }
}

export const generator = (
  name: string,
  block: Generator = {
    name,
    type: 'generator',
    fields: new Map()
  }
) => {
  const addProvider = (provider: string, isEnv: boolean) =>
    addEnvField('provider', provider, isEnv, block)

  const addOutput = (output: string, isEnv: boolean) => addEnvField('output', output, isEnv, block)

  const addPreviewFeatures = (features: string[]) =>
    addOptionsListField('previewFeatures', features, block)

  const addEngineType = (engine: string) => addOptionField('engineType', engine, block)

  const addBinaryTargets = (targets: string[]) =>
    addOptionsListField('binaryTargets', targets, block)

  const _parse = (list: (AstGenerator | AstDatasource)['assignments'] = []) =>
    parseAssignments(block, list)

  return {
    block,
    addProvider,
    addOutput,
    addPreviewFeatures,
    addEngineType,
    addBinaryTargets,
    _parse
  }
}

export const enumBlock = (
  name: string,
  block: Enum = {
    name,
    type: 'enum',
    fields: new Map()
  }
) => {
  const _parse = (list: AstEnum['enumerators'] = []) => {
    for (const item of list) {
      if (item.type !== 'enumerator') continue

      const { name } = item

      block.fields.set(name, enumField(name).field)
    }
  }

  const addOption = (option: string) => {
    const { field } = enumField(option)
    block.fields.set(option, field)
  }

  return { block, addOption, _parse }
}

export const model = (
  name: string,
  block: Model = { name, type: 'model', fields: new Map(), attributes: new Map() },
  state: PrismaSchemaState
) => {
  const _parse = (model: AstModel) => {
    const props = model?.properties || []

    for (const prop of props) {
      if (prop.type === 'field') {
        const { fieldType, name } = prop

        const { field } = createFieldFromType(
          name,
          fieldType as string,
          state.enumIds,
          state.modelIds
        )

        block.fields.set(field.name, field)

        continue
      }

      if (prop.type === 'attribute') {
        const { name, args } = prop
      }
    }
  }

  return { block, _parse }
}
