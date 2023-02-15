import { Block } from './Block'
import { EnvField, OptionField } from '../fields'
import { PrismaSchemaState } from '../PrismaSchemaState'
import { PrismaDatasourceProviderType, PrismaDatasourceRelationModeType } from '../constants'

export class Datasource extends Block<
  OptionField | EnvField,
  'provider' | 'url' | 'shadowDatabaseUrl' | 'relationMode'
> {
  constructor(id: string, state: PrismaSchemaState) {
    super(id, 'datasource', state)
  }

  addProvider(provider: PrismaDatasourceProviderType) {
    this.addField('provider', new OptionField('provider', this))

    const field = this.field<OptionField>('provider')
    field.setValue(provider)

    return field
  }

  addUrl(url: string, isEnv = true) {
    this.addField('url', new EnvField('url', this))

    const field = this.field<EnvField>('url')
    field.setValue(url)
    if (!isEnv) field.toggleIsEnv(isEnv)

    return field
  }

  addShadowDatabaseUrl(url: string, isEnv = true) {
    this.addField('shadowDatabaseUrl', new EnvField('shadowDatabaseUrl', this))

    const field = this.field<EnvField>('shadowDatabaseUrl')
    field.setValue(url)
    if (!isEnv) field.toggleIsEnv(isEnv)

    return field
  }

  addRelationMode(mode: PrismaDatasourceRelationModeType) {
    this.addField('relationMode', new OptionField('relationMode', this))

    const field = this.field<OptionField>('relationMode')
    field.setValue(mode)

    return field
  }

  _clone(state: PrismaSchemaState) {
    const cloned = new Datasource(this.name, state)

    this.fieldsMap.forEach((field) => cloned.addField(field.name, field._clone(cloned)))

    return cloned
  }
}
