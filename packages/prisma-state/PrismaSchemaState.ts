import { getSchema } from '@mrleebo/prisma-ast'
import { Enum, Datasource, Generator, Model } from './blocks'
import { testSchema } from './testSchema'
import { extractBlockIdsByType, extractBlocksByType } from './utils/block'

export type PrismaSchemaStateItem = Datasource | Generator | Enum | Model
export type PrismaSchemaStateData = Map<string, PrismaSchemaStateItem>

// export type OnBlockUpdate = (id: string, item: PrismaSchemaStateItem) => void
// export type OnBlockDelete = (id: string) => void

export class PrismaSchemaState {
  readonly state: PrismaSchemaStateData = new Map()

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

  enum(id: string) {
    return this.enums.get(id)!
  }

  parseSchemaString(schema: string) {
    console.log('START')
    console.time()

    const { list } = getSchema(schema)

    console.log(list)

    for (const block of list) {
      if (block.type === 'datasource') {
        const datasource = new Datasource(block.name, this)
        datasource._parseAssignments(block.assignments)
        this.state.set(datasource.id, datasource)

        continue
      }

      if (block.type === 'generator') {
        const generator = new Generator(block.name, this)
        generator._parseAssignments(block.assignments)
        this.state.set(generator.id, generator)

        continue
      }

      if (block.type === 'model') {
        const model = new Model(block.name, this)
        this.state.set(model.id, model)

        continue
      }

      if (block.type === 'enum') {
        const enumBlock = new Enum(block.name, this)
        enumBlock._parse(block.enumerators)
        this.state.set(enumBlock.id, enumBlock)
      }
    }

    for (const block of list) {
      if (block.type === 'model') {
        const model = this.model(block.name)
        model._parse(block)
        this.state.set(model.id, model)
      }
    }

    console.timeEnd()
    // console.log({
    //   state: this.state,
    //   schema: `${[...this.state.values()].map((block) => block._toString()).join('\r\n')}`
    // })
  }

  toString() {
    return `${[...this.state.values()].map((block) => block._toString()).join('\r\n')}`
  }
}

const schema = new PrismaSchemaState()

schema.parseSchemaString(testSchema)

// const userModel = schema.model('User')

// userModel.field('email')!.setName('emailUpdate')
// userModel.setName('UserUpdate')
// userModel.setName('UserUpdate2')

console.log({
  state: schema.state,
  str: schema.toString()
})
