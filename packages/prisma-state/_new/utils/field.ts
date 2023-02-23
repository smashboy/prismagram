import { ScalarTypeOption } from '../../constants'
import {
  EnumField,
  EnumModelField,
  EnvField,
  ModelFieldBase,
  OptionField,
  OptionsListField,
  RelationField,
  ScalarField
} from '../fields'
import {
  DatasourceData,
  EnumData,
  GeneratorData,
  ModelData,
  ScalarFieldData,
  RelationFieldData,
  EnumFieldData,
  EnumModelFieldData,
  TopLevelFieldData
} from '../types'

const settingsFieldMap = {
  env: EnvField,
  option: OptionField,
  list: OptionsListField
}

export const fieldToString = (
  block: DatasourceData | GeneratorData | EnumData | ModelData,
  field: TopLevelFieldData,
  enumIds: string[],
  modelIds: string[]
) => {
  if (block.type === 'datasource' || block.type === 'generator') {
    const Field = settingsFieldMap[field.type as keyof typeof settingsFieldMap]

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return Field._toString(field)
  }

  if (block.type === 'enum') {
    return EnumField._toString(field as EnumFieldData)
  }

  const fieldHelper = createFieldFromType(
    field.name,
    field.type,
    block.name,
    enumIds,
    modelIds,
    field as RelationFieldData | ScalarFieldData | EnumModelFieldData
  )

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return ModelFieldBase._toString(fieldHelper._data(), fieldHelper.displayType)
}

export const createFieldFromType = (
  name: string,
  type: string,
  blockId: string,
  enumIds: string[],
  modelIds: string[],
  field?: RelationFieldData | ScalarFieldData | EnumModelFieldData
) => {
  if (enumIds.indexOf(type) > -1)
    return new EnumModelField(name, type, blockId, field as EnumModelFieldData)

  if (modelIds.indexOf(type) > -1)
    return new RelationField(name, type, blockId, field as RelationFieldData)

  return new ScalarField(name, type as ScalarTypeOption, blockId, field as ScalarFieldData)
}
