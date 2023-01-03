import { Block } from './Block'
import { EnvField } from '../fields/EnvField'
import { OptionField } from '../fields/OptionField'
import * as lineUtils from '../utils/line'

// export interface DatasourceData {
//   provider: PrismaDatasourceProviderType
//   url: EnvValue
//   shadowDatabaseUrl?: EnvValue
//   relationMode?: PrismaDatasourceRelationModeType
// }

type FieldKey = 'provider' | 'url' | 'shadowDatabaseUrl' | 'relationMode'

const datasourceEnvFields = ['url', 'shadowDatabaseUrl']

export class Datasource extends Block<OptionField | EnvField, FieldKey> {
  constructor(id: string) {
    super(id, 'datasource')
  }

  _parseLine(line: string, lineIndex: string) {
    const [field, value] = lineUtils.getCommonField(line)

    if (datasourceEnvFields.includes(field)) {
      const envField = new EnvField(field, lineIndex)
      envField._parse(value)
      return this.addField(field as FieldKey, envField)
    }

    const optionField = new OptionField(field, lineIndex)
    optionField._parse(value)
    this.addField(field as FieldKey, optionField)
  }
}
