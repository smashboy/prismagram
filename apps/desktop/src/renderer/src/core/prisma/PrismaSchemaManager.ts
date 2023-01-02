import { Datasource, DatasourceData } from './Datasource'
import { Generator, GeneratorData } from './Generator'
import { testSchema } from './testSchema'
import * as lineUtils from './utils/line'

const datasourceEnvFields = ['url', 'shadowDatabaseUrl']
const generatorEnvFields = ['provider', 'output']
const generatorArrayLikeFields = ['previewFeatures', 'binaryTargets']

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
          case 'generator': {
            const [field, value] = lineUtils.getCommonField(line)

            if (generatorEnvFields.includes(field)) {
              currentBlock._setField(field as keyof GeneratorData, lineUtils.getEnvValue(value))
              continue
            }

            if (generatorArrayLikeFields.includes(field)) {
              currentBlock._setField(field as keyof GeneratorData, lineUtils.arrayFromString(value))
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
