import { Enum, Datasource, Generator, Model } from './blocks'
import { testSchema } from './testSchema'
import { extractBlockIdsByType, extractBlocksByType } from './utils/block'
import * as lineUtils from './utils/line'

export type PrismaSchemaStateData = Map<string, Datasource | Generator | Enum | Model>

export class PrismaSchemaState {
  readonly state: PrismaSchemaStateData = new Map()
  private lines: string[] = []

  get modelIds() {
    return extractBlockIdsByType('model', this.state)
  }

  get enumIds() {
    return extractBlockIdsByType('enum', this.state)
  }

  get models() {
    return extractBlocksByType<Model>('model', this.state)
  }

  get enums() {
    return extractBlocksByType<Enum>('enum', this.state)
  }

  model(id: string) {
    return this.models.get(id)!
  }

  enum(id: string) {
    return this.enums.get(id)!
  }

  parseSchemaString(schema: string) {
    console.log('START')
    console.time()
    this.lines = schema.trim().split(/\r?\n/)

    let currentBlock: Datasource | Generator | Enum | Model | null = null

    for (const index in this.lines) {
      const line = this.lines[index].trim()

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

    for (const index in this.lines) {
      const line = this.lines[index].trim()

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
    // console.log({
    //   state: this.state,
    //   schema: `${[...this.state.values()].map((block) => block._toString()).join('\r\n')}`
    // })
  }
}

const schema = new PrismaSchemaState()

schema.parseSchemaString(testSchema)

// const userModel = schema.model('User')

// userModel.field('email')!.setName('emailUpdate')
// userModel.setName('UserUpdate')

console.log(schema.models)
