import { Datasource } from './blocks/Datasource'
import { Enum } from './blocks/Enum'
import { Generator } from './blocks/Generator'
import { testSchema } from './testSchema'
import * as lineUtils from './utils/line'

export class PrismaSchemaManager {
  private schema = new Map<string, Datasource | Generator | Enum>()

  constructor(schema: string) {
    this.parseSchemaString(schema)
  }

  private parseSchemaString(schema: string) {
    const lines = schema.trim().split(/\r?\n/)

    let currentBlock: Datasource | Generator | Enum | null = null

    for (const index in lines) {
      const line = lines[index].trim()

      // if (line === '') {
      //   breaks.push(line)
      //   continue
      // }

      // if (line.startsWith('//')) {
      //   comments.push(line)
      //   continue
      // }

      if (line.startsWith('model')) {
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
        this.schema.set(currentBlock.id, currentBlock)
        currentBlock = null
        continue
      }

      if (currentBlock) {
        currentBlock._parseLine(line, index)
        continue
      }
    }

    console.log({
      schema: this.schema,
      string: `${[...this.schema.values()].map((block) => block._toString()).join('\r\n')}`
    })
  }

  // createModel() {}
  // editModel() {}
  // deleteModel() {}
}

new PrismaSchemaManager(testSchema)
