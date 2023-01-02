import {
  PrismaDatasourceProvider,
  PrismaDatasourceProviderType,
  PrismaDatasourceRelationModeType
} from '@shared/common/configs/prisma'
import { EnvValue } from '@shared/common/models/Prisma'
import { Block } from './Block'

export interface DatasourceData {
  provider: PrismaDatasourceProviderType
  url: EnvValue
  shadowDatabaseUrl?: EnvValue
  relationMode?: PrismaDatasourceRelationModeType
}

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

  _setField<K extends keyof DatasourceData>(field: K, value: DatasourceData[K]) {
    this.data[field] = value
  }
}
