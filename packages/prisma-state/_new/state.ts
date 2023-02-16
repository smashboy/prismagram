import { getSchema } from '@mrleebo/prisma-ast/src/getSchema'
import { datasource, enumBlock, model, generator } from './blocks'
import {
  Enum,
  Generator,
  Model,
  PrismaSchemaStateData,
  ModelField,
  Field,
  Datasource,
  ScalarField,
  EnvField,
  OptionsListField,
  OptionField,
  PrismaSchemaStateInstance
} from './types'
import { EOL } from './utils/constants'
import { extractBlockIdsByType, extractBlocksByType } from './utils/block'
import { getFieldFunc } from './utils/_fuck'
import { attributeToString } from './utils/parser'

export class PrismaSchemaState implements PrismaSchemaStateInstance {
  private readonly state: PrismaSchemaStateData

  constructor(state: PrismaSchemaStateData = new Map()) {
    this.state = state
  }

  get datasource() {
    return [...this.state.values()].find((block) => block.type === 'datasource') as Datasource
  }

  get generators() {
    return extractBlocksByType<Generator>('generator', this.state)
  }

  get models() {
    return extractBlocksByType<Model>('model', this.state)
  }

  get enums() {
    return extractBlocksByType<Enum>('enum', this.state)
  }

  get modelIds() {
    return extractBlockIdsByType('model', this.state)
  }

  get enumIds() {
    return extractBlockIdsByType('enum', this.state)
  }

  model(id: string) {
    return this.models.get(id)!
  }

  enum(id: string) {
    return this.enums.get(id)!
  }

  fromString(schema: string) {
    console.log('START')
    console.time()

    const { list } = getSchema(schema)

    for (const block of list) {
      if (block.type === 'datasource') {
        const dtsrc = datasource(block.name)
        dtsrc._parse(block.assignments)
        this.state.set(dtsrc.block.name, dtsrc.block)
        continue
      }

      if (block.type === 'generator') {
        const asgm = generator(block.name)
        asgm._parse(block.assignments)
        this.state.set(asgm.block.name, asgm.block)
        continue
      }

      if (block.type === 'model') {
        const mdl = model(block.name, this, this.model(block.name))
        this.state.set(mdl.block.name, mdl.block)
        continue
      }

      if (block.type === 'enum') {
        const enm = enumBlock(block.name)
        enm._parse(block.enumerators)
        this.state.set(enm.block.name, enm.block)
      }
    }

    for (const block of list) {
      if (block.type === 'model') {
        const mdl = model(block.name, this, this.model(block.name))
        mdl._parse(block)
        this.state.set(mdl.block.name, mdl.block)
      }
    }

    console.timeEnd()
  }

  toString() {
    const _blockFieldToString = (
      block: Datasource | Generator | Enum | Model,
      field: ModelField | ScalarField | OptionField | EnvField | OptionsListField | Field
    ) => getFieldFunc(block, field, this.enumIds, this.modelIds)._toString()

    const _blockToString = (block: Datasource | Generator | Model | Enum) => `${block.type} ${
      block.name
    } {
      ${[...block.fields.values()].map((field) => _blockFieldToString(block, field)).join(EOL)}

      ${
        block.type === 'model' && block.attributes.size > 0
          ? [...block.attributes.values()].map((attr) => attributeToString(attr)).join(EOL)
          : ''
      }
    }`

    return `${[...this.state.values()].map(_blockToString).join(EOL)}`
  }

  _clone() {
    return new PrismaSchemaState(structuredClone(this.state))
  }
}

export const createPrismaSchemaState = (state?: PrismaSchemaStateData) =>
  new PrismaSchemaState(state)
