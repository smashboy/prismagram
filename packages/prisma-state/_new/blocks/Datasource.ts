import { SettingsBlockBase } from './SettingsBlockBase'
import { DatasourceData, PrismaSchemaStateInstance } from '../types'

export class Datasource extends SettingsBlockBase<DatasourceData> {
  constructor(
    name: string,
    state: PrismaSchemaStateInstance,
    data: DatasourceData = { name, type: 'datasource', fields: new Map() }
  ) {
    super(data, state)
  }
}
