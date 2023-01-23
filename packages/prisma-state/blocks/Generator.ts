import { Block } from './Block'
import { OptionsListField } from '../fields/OptionsListField'
import { EnvField } from '../fields/EnvField'
import { OptionField } from '../fields/OptionField'
import { PrismaSchemaState } from '../PrismaSchemaState'

export class Generator extends Block<
  EnvField | OptionsListField | OptionField,
  'provider' | 'output' | 'previewFeatures' | 'binaryTargets' | 'engineType'
> {
  constructor(id: string, state: PrismaSchemaState) {
    super(id, 'generator', state)
  }
}
