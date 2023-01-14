import { Block } from './Block'
import { OptionsListField } from '../fields/OptionsListField'
import { EnvField } from '../fields/EnvField'
import { OptionField } from '../fields/OptionField'
import { PrismaSchemaState } from '../PrismaSchemaState'

// export interface GeneratorData {
//   provider: EnvValue
//   output?: EnvValue
//   previewFeatures: string[]
//   engineType?: string
//   binaryTargets: string[]
// }

// const generatorEnvFields = ['provider', 'output']
// const generatorArrayLikeFields = ['previewFeatures', 'binaryTargets']

type FieldKey = 'provider' | 'output' | 'previewFeatures' | 'binaryTargets' | 'engineType'

export class Generator extends Block<EnvField | OptionsListField | OptionField, FieldKey> {
  constructor(id: string, state: PrismaSchemaState) {
    super(id, 'generator', state)
  }
}
