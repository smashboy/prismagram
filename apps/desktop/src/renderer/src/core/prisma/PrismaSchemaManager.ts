import { Datasource, DatasourceData } from './Datasource'
import { Generator } from './Generator'
import { testSchema } from './testSchema'
import * as lineUtils from './utils/line'

const datasourceEnvFields = ['url', 'shadowDatabaseUrl']
const generatorEnvFields = ['provider', 'output']

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

      if (currentBlock && line.startsWith('}')) {
        this.schema.set(currentBlock.id, currentBlock)
        currentBlock = null
        continue
      }

      if (currentBlock) {
        switch (currentBlock.type) {
          case 'datasource': {
            const [field, value] = lineUtils.getCommonField(line)

            if (datasourceEnvFields.includes(field)) {
              currentBlock._setField(field as keyof DatasourceData, lineUtils.getEnvValue(value))
              continue
            }

            currentBlock._setField(field as keyof DatasourceData, lineUtils.stripValue(value))
            continue
          }
          default:
            continue
        }
      }
    }

    console.log(this.schema)
  }

  createModel() {}
  editModel() {}
  deleteModel() {}
}

new PrismaSchemaManager(testSchema)
