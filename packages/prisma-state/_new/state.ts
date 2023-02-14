import { getSchema } from '@mrleebo/prisma-ast/src/getSchema'
import { datasource, enumBlock } from './blocks'
import { Enum, Generator, Model, PrismaSchemaStateData } from './types'
import { extractBlockIdsByType, extractBlocksByType } from './utils'

export class PrismaSchemaState {
  private readonly state: PrismaSchemaStateData

  constructor(state: PrismaSchemaStateData = new Map()) {
    this.state = state
  }

  get datasource() {
    return [...this.state.values()].find((block) => block.type === 'datasource')!
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
        const asgm = datasource(block.name)
        asgm._parse(block.assignments)
        this.state.set(asgm.block.name, asgm.block)
        continue
      }

      if (block.type === 'model') {
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
        const mdl = this.model(block.name)
      }
    }

    console.timeEnd()
  }
}

export const createPrismaSchemaState = (state?: PrismaSchemaStateData) =>
  new PrismaSchemaState(state)
