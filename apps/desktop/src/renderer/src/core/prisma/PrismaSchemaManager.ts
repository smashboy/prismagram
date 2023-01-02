import { Datasource, DatasourceData } from './Datasource'
import { Generator, GeneratorData } from './Generator'
import { testSchema } from './testSchema'
import * as lineUtils from './utils/line'

export class PrismaSchemaManager {
  private schema = new Map<string, Datasource | Generator>()

  constructor(schema: string) {
    this.parseSchemaString(schema)
  }

  private parseSchemaString(schema: string) {
    const lines = schema.trim().split(/\r?\n/)

    let currentBlock: Datasource | Generator | null = null

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
        currentBlock._parseLine(line)
        continue
      }
    }

    console.log(this.schema)
  }

  createModel() {}
  editModel() {}
  deleteModel() {}
}

new PrismaSchemaManager(testSchema)
