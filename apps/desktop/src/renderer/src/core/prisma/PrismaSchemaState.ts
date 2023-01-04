import { Datasource } from './blocks/Datasource'
import { Enum } from './blocks/Enum'
import { Generator } from './blocks/Generator'
import { Model } from './blocks/Model'
import { testSchema } from './testSchema'
import * as lineUtils from './utils/line'

export class PrismaSchemaState {
  private state = new Map<string, Datasource | Generator | Enum | Model>()

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

      // TODO: store breaks ?
      if (line === '') {
        continue
      }

      // TODO
      if (line.startsWith('//')) {
        continue
      }

      if (line.startsWith('model')) {
        const id = lineUtils.getBlockId(line)
        currentBlock = new Model(id)
        continue
      }

      if (line.startsWith('enum')) {
        const id = lineUtils.getBlockId(line)
        currentBlock = new Enum(id)
        continue
      }

      if (line.startsWith('datasource')) {
        const id = lineUtils.getBlockId(line)

        currentBlock = new Datasource(id)
        continue
      }

      if (line.startsWith('generator')) {
        const id = lineUtils.getBlockId(line)

        currentBlock = new Generator(id)
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

  // createModel() {}
  // editModel() {}
  // deleteModel() {}
}

new PrismaSchemaState(testSchema)
