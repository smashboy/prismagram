import { EnvValue } from '@shared/common/models/Prisma'
import { Block } from './Block'

export interface GeneratorData {
  provider: EnvValue
  output?: EnvValue
  previewFeatures: string[]
  engineType?: string
  binaryTargets: string[]
}

export class Generator extends Block {
  private data: GeneratorData = {
    provider: {
      value: '',
      isEnv: false
    },
    previewFeatures: [],
    binaryTargets: []
  }

  constructor(id: string) {
    super(id, 'generator')
  }

  get id(): string {
    return `${this.type}.${this.blockId}`
  }

  setProvider(value: string, isEnv = false) {
    this.data.provider = { value, isEnv }
  }

  setOutput(value: string, isEnv = false) {
    this.data.output = { value, isEnv }
  }

  deleteField(field: keyof GeneratorData) {
    this.data = this._deleteField(field, this.data)
  }

  _setField<K extends keyof GeneratorData>(field: K, value: GeneratorData[K]) {
    this.data[field] = value
  }
}
