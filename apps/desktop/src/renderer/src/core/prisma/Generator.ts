import { EnvValue } from '@shared/common/models/Prisma'
import { Block } from './Block'
import * as lineUtils from './utils/line'

export interface GeneratorData {
  provider: EnvValue
  output?: EnvValue
  previewFeatures: string[]
  engineType?: string
  binaryTargets: string[]
}

const generatorEnvFields = ['provider', 'output']
const generatorArrayLikeFields = ['previewFeatures', 'binaryTargets']

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
    this._setField('provider', { value, isEnv })
  }

  setOutput(value: string, isEnv = false) {
    this._setField('output', { value, isEnv })
  }

  addPreviewFeature(feature: string) {
    this._setField('previewFeatures', [...new Set([...this.data.previewFeatures, feature])])
  }

  removePreviewFeature(feature: string) {
    this._setField(
      'previewFeatures',
      this.data.previewFeatures.filter((selectedFeature) => selectedFeature !== feature)
    )
  }

  addBinaryTarget(target: string) {
    this._setField('binaryTargets', [...new Set([...this.data.binaryTargets, target])])
  }

  removeBinaryTarget(target: string) {
    this._setField(
      'binaryTargets',
      this.data.binaryTargets.filter((selectedTarget) => selectedTarget !== target)
    )
  }

  deleteField(field: keyof GeneratorData) {
    this.data = this._deleteField(field, this.data)
  }

  _parseLine(line: string) {
    const [field, value] = lineUtils.getCommonField(line)

    if (generatorEnvFields.includes(field))
      return this._setField(field as keyof GeneratorData, lineUtils.getEnvValue(value))

    if (generatorArrayLikeFields.includes(field))
      return this._setField(field as keyof GeneratorData, lineUtils.arrayFromString(value))

    this._setField(field as keyof GeneratorData, lineUtils.stripValue(value))
  }

  private _setField<K extends keyof GeneratorData>(field: K, value: GeneratorData[K]) {
    this.data[field] = value
  }
}
