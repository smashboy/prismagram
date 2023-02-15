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

  _clone(state: PrismaSchemaState) {
    const cloned = new Generator(this.name, state)

    this.fieldsMap.forEach((field) => cloned.addField(field.name, field._clone(cloned)))

    return cloned
  }
}
