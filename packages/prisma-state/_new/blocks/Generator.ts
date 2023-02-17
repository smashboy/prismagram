import { SettingsBlockBase } from './SettingsBlockBase'
import { GeneratorData, PrismaSchemaStateInstance } from '../types'

export class Generator extends SettingsBlockBase<GeneratorData> {
  constructor(
    name: string,
    state: PrismaSchemaStateInstance,
    data: GeneratorData = { name, type: 'generator', fields: new Map() }
  ) {
    super(data, state)
  }
}
