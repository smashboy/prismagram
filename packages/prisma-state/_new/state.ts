import { getSchema } from '@mrleebo/prisma-ast/src/getSchema'
import {
  EnumData,
  GeneratorData,
  ModelData,
  PrismaSchemaStateData,
  DatasourceData,
  PrismaSchemaStateInstance
} from './types'
import { extractBlockIdsByType, extractBlocksByType } from './utils/block'
import { EOL } from '../constants'
import { BlockBase, Datasource, Enum, Generator, Model } from './blocks'

export class PrismaSchemaState implements PrismaSchemaStateInstance {
  private readonly state: PrismaSchemaStateData

  constructor(state: PrismaSchemaStateData = new Map()) {
    this.state = state
  }

  get datasource() {
    return [...this.state.values()].find((block) => block.type === 'datasource') as DatasourceData
  }

  get generators() {
    return extractBlocksByType<GeneratorData>('generator', this.state)
  }

  get models() {
    return extractBlocksByType<ModelData>('model', this.state)
  }

  get enums() {
    return extractBlocksByType<EnumData>('enum', this.state)
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

  createModel(name: string) {
    const model = new Model(name, this)
    this.state.set(model.name, model._data())
    return this.models.get(name)
  }

  createEnum(name: string) {
    const enumBlock = new Enum(name, this)
    this.state.set(enumBlock.name, enumBlock._data())
    return this.enums.get(name)
  }

  removeModel(id: string) {
    const data = this.model(id)

    if (!data) return
  }

  removeEnum(id: string) {
    const data = this.enum(id)

    if (!data) return

    const enumBlock = new Enum(data.name, this, data)

    const refs = enumBlock.getReferences()

    for (const { model, fields } of refs) {
      fields.forEach((field) => model.fields.delete(field.name))
    }

    this.state.delete(id)
  }

  fromString(schema: string) {
    console.log('START NEW')
    console.time()

    const { list } = getSchema(schema)

    for (const block of list) {
      if (block.type === 'datasource') {
        const datasource = new Datasource(block.name, this)
        datasource._parse(block.assignments)
        this.state.set(datasource.name, datasource._data())
        continue
      }

      if (block.type === 'generator') {
        const generator = new Generator(block.name, this)
        generator._parse(block.assignments)
        this.state.set(generator.name, generator._data())
        continue
      }

      if (block.type === 'model') {
        const model = new Model(block.name, this)
        this.state.set(model.name, model._data())
        continue
      }

      if (block.type === 'enum') {
        const enumItem = new Enum(block.name, this)
        enumItem._parse(block.enumerators)
        this.state.set(enumItem.name, enumItem._data())
      }
    }

    for (const block of list) {
      if (block.type === 'model') {
        const model = new Model(block.name, this)
        model._parse(block)
        this.state.set(model.name, model._data())
      }
    }

    console.timeEnd()
  }

  toString() {
    return `${[...this.state.values()].map((block) => BlockBase._toString(block, this)).join(EOL)}`
  }

  _data() {
    return structuredClone(this.state)
  }

  _clone() {
    return new PrismaSchemaState(this._data())
  }
}

export const createPrismaSchemaState = (state?: PrismaSchemaStateData) =>
  new PrismaSchemaState(state)

// const state = createPrismaSchemaState()

// state.fromString(testSchema)

// console.log({ state, str: state.toString() })
