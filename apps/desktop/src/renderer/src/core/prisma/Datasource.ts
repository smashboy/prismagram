import {
  PrismaDatasourceProvider,
  PrismaDatasourceProviderType,
  PrismaDatasourceRelationModeType
} from '@shared/common/configs/prisma'
import { EnvValue } from '@shared/common/models/Prisma'
import { Block } from './Block'
import * as lineUtils from './utils/line'

export interface DatasourceData {
  provider: PrismaDatasourceProviderType
  url: EnvValue
  shadowDatabaseUrl?: EnvValue
  relationMode?: PrismaDatasourceRelationModeType
}

const datasourceEnvFields = ['url', 'shadowDatabaseUrl']

export class Datasource extends Block {
  private data: DatasourceData = {
    provider: PrismaDatasourceProvider.POSTGRESQL,
    url: {
      value: '',
      isEnv: false
    }
  }

  constructor(id: string) {
    super(id, 'datasource')
  }

  get id(): string {
    return `${this.type}.${this.blockId}`
  }

  setProvider(provider: PrismaDatasourceProviderType) {
    this.data.provider = provider
  }

  setUrl(value: string, isEnv = false) {
    this.data.url = { value, isEnv }
  }

  setShadowDatabaseUrl(value: string, isEnv = false) {
    this.data.shadowDatabaseUrl = { value, isEnv }
  }

  setRelationMode(value: PrismaDatasourceRelationModeType) {
    this.data.relationMode = value
  }

  deleteField(field: keyof DatasourceData) {
    this.data = this._deleteField(field, this.data)
  }

  _parseLine(line: string) {
    const [field, value] = lineUtils.getCommonField(line)

    if (datasourceEnvFields.includes(field))
      return this._setField(field as keyof DatasourceData, lineUtils.getEnvValue(value))

    this._setField(field as keyof DatasourceData, lineUtils.stripValue(value))
  }

  private _setField<K extends keyof DatasourceData>(field: K, value: DatasourceData[K]) {
    this.data[field] = value
  }
}
