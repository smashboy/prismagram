import { Block } from './Block'
import { ArrayField } from '../fields/ArrayField'
import { EnvField } from '../fields/EnvField'
import { OptionField } from '../fields/OptionField'
import * as lineUtils from '../utils/line'

// export interface GeneratorData {
//   provider: EnvValue
//   output?: EnvValue
//   previewFeatures: string[]
//   engineType?: string
//   binaryTargets: string[]
// }

const generatorEnvFields = ['provider', 'output']
const generatorArrayLikeFields = ['previewFeatures', 'binaryTargets']

type FieldKey = 'provider' | 'output' | 'previewFeatures' | 'binaryTargets'

export class Generator extends Block<EnvField | ArrayField | OptionField, FieldKey> {
  constructor(id: string) {
    super(id, 'generator')
  }

  _parseLine(line: string, lineIndex: number) {
    const [field, value] = lineUtils.getCommonField(line)

    if (generatorEnvFields.includes(field)) {
      const envField = new EnvField(field, lineIndex)
      envField._parse(value)
      return this.addField(field as FieldKey, envField)
    }

    if (generatorArrayLikeFields.includes(field)) {
      const arrayField = new ArrayField(field, lineIndex)
      arrayField._parse(value)
      return this.addField(field as FieldKey, arrayField)
    }

    const optionField = new OptionField(field, lineIndex)
    optionField._parse(value)
    this.addField(field as FieldKey, optionField)
  }
}
