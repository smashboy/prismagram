import { Block } from './Block'
import { EnvField, OptionField } from '../fields'
import { PrismaSchemaState } from '../PrismaSchemaState'

// export interface DatasourceData {
//   provider: PrismaDatasourceProviderType
//   url: EnvValue
//   shadowDatabaseUrl?: EnvValue
//   relationMode?: PrismaDatasourceRelationModeType
// }

type FieldKey = 'provider' | 'url' | 'shadowDatabaseUrl' | 'relationMode'

// const datasourceEnvFields = ['url', 'shadowDatabaseUrl']

export class Datasource extends Block<OptionField | EnvField, FieldKey> {
  constructor(id: string, state: PrismaSchemaState) {
    super(id, 'datasource', state)
  }
}
