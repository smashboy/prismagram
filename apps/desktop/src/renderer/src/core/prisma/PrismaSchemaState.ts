import { Datasource } from './blocks/Datasource'
import { Enum } from './blocks/Enum'
import { Generator } from './blocks/Generator'
import { Model } from './blocks/Model'
import { testSchema } from './testSchema'
import { extractBlockIdsByType } from './utils/block'
import * as lineUtils from './utils/line'

export type PrismaSchemaStateData = Map<string, Datasource | Generator | Enum | Model>

export class PrismaSchemaState {
  readonly state: PrismaSchemaStateData = new Map()

  constructor(schema: string) {
    this.parseSchemaString(schema)
  }

  private parseSchemaString(schema: string) {
    console.log('START')
    console.time()
    const lines = schema.trim().split(/\r?\n/)

    let currentBlock: Datasource | Generator | Enum | Model | null = null

    for (const index in lines) {
      const line = lines[index].trim()

      if (lineUtils.isBlock('model', line)) {
        const id = lineUtils.getBlockId(line)
        const model = new Model(id, this)
        this.state.set(model.id, model)
      }

      if (lineUtils.isBlock('enum', line)) {
        const id = lineUtils.getBlockId(line)
        const enumBlock = new Enum(id, this)
        this.state.set(enumBlock.id, enumBlock)
      }
    }

    for (const index in lines) {
      const line = lines[index].trim()

      // TODO: store breaks ?
      if (line === '') {
        continue
      }

      // TODO
      if (line.startsWith('//')) {
        continue
      }

      if (lineUtils.isBlock('model', line)) {
        const id = lineUtils.getBlockId(line)
        currentBlock = new Model(id, this)
        continue
      }

      if (lineUtils.isBlock('enum', line)) {
        const id = lineUtils.getBlockId(line)
        currentBlock = new Enum(id, this)
        continue
      }

      if (lineUtils.isBlock('datasource', line)) {
        const id = lineUtils.getBlockId(line)
        currentBlock = new Datasource(id, this)
        continue
      }

      if (lineUtils.isBlock('generator', line)) {
        const id = lineUtils.getBlockId(line)
        currentBlock = new Generator(id, this)
        continue
      }

      if (currentBlock && line.startsWith('}')) {
        this.state.set(currentBlock.id, currentBlock)
        currentBlock = null
        continue
      }

      if (currentBlock) {
        currentBlock._parseLine(line, index)
        continue
      }
    }

    console.timeEnd()
    console.log({
      state: this.state,
      schema: `${[...this.state.values()].map((block) => block._toString()).join('\r\n')}`
    })
  }

  get modelIds() {
    return extractBlockIdsByType('model', this.state)
  }

  get enumIds() {
    return extractBlockIdsByType('enum', this.state)
  }

  // createModel() {}
  // editModel() {}
  // deleteModel() {}
}

new PrismaSchemaState(testSchema)
