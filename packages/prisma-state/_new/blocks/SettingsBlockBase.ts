import {
  Datasource as AstDatasource,
  Generator as AstGenerator
} from '@mrleebo/prisma-ast/src/getSchema'
import { EnvField, OptionField, OptionsListField } from '../fields'
import {
  DatasourceData,
  EnvFieldData,
  GeneratorData,
  OptionFieldData,
  OptionsListFieldData,
  Writeable
} from '../types'
import { BlockBase } from './BlockBase'

export abstract class SettingsBlockBase<B extends DatasourceData | GeneratorData> extends BlockBase<
  B,
  Writeable<OptionFieldData | EnvFieldData | OptionsListFieldData>
> {
  static generatorEnvFields = ['provider', 'output']
  static datasourceEnvFields = ['url', 'shadowDatabaseUrl']

  _parse(list: (AstGenerator | AstDatasource)['assignments'] = []) {
    for (const assignment of list) {
      if (assignment.type !== 'assignment') continue

      const { key, value } = assignment

      if (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (value?.type === 'function' && value?.name === 'env') ||
        (this.type === 'datasource' && SettingsBlockBase.datasourceEnvFields.includes(key)) ||
        (this.type === 'generator' && SettingsBlockBase.generatorEnvFields.includes(key))
      ) {
        const field = new EnvField(key)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        field._parse(value?.params ?? [value])

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (!value?.params) field.toggleIsEnv(false)

        this.fields.set(field.name, field._data())
        continue
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (value?.type === 'array') {
        const optionsField = new OptionsListField(key)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        optionsField._parse(value.args)
        this.fields.set(optionsField.name, optionsField._data())
        continue
      }

      const optionField = new OptionField(key)

      optionField._parse(value as string)
      this.fields.set(optionField.name, optionField._data())
    }
  }
}
