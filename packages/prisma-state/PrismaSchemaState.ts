import { getSchema } from '@mrleebo/prisma-ast/src/getSchema'
import { Enum, Datasource, Generator, Model } from './blocks'
import { RelationField } from './fields'
import { RelationsManager } from './RelationsManager'
import { testSchema } from './testSchema'
import { extractBlockIdsByType, extractBlocksByType } from './utils/block'

export type PrismaSchemaStateItem = Datasource | Generator | Enum | Model
export type PrismaSchemaStateData = Map<string, PrismaSchemaStateItem>

// export type OnBlockUpdate = (id: string, item: PrismaSchemaStateItem) => void
// export type OnBlockDelete = (id: string) => void

export class PrismaSchemaState {
  readonly state: PrismaSchemaStateData = new Map()
  readonly relations = new RelationsManager()

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

  removeModel(id: string) {
    const model = this.model(id)

    if (!model) return

    const relationFields = model.fields.filter(
      (field) => field instanceof RelationField
    ) as RelationField[]
    relationFields.forEach((field) => field.remove())
    this.state.delete(`model.${id}`)
  }

  removeEnum(id: string) {
    const enumItem = this.enum(id)

    if (!enumItem) return

    const refs = enumItem.getReferences()

    for (const { model, fields } of refs) {
      fields.forEach((field) => model.removeField(field.name))
    }

    this.state.delete(`enum.${id}`)
  }

  enum(id: string) {
    return this.enums.get(id)!
  }

  createModel(name: string) {
    const model = new Model(name, this)
    this.state.set(model.id, model)

    return this.model(name)
  }

  createEnum(name: string) {
    const enumItem = new Enum(name, this)
    this.state.set(enumItem.id, enumItem)

    return this.enum(name)
  }

  fromString(schema: string) {
    console.time()

    const { list } = getSchema(schema)

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
    // console.log(this.state)
  }

  toString() {
    return `${[...this.state.values()].map((block) => block._toString()).join('\r\n')}`
  }

  _clone() {
    const cloned = new PrismaSchemaState()

    this.state.forEach((block, key) => cloned.state.set(key, block._clone(cloned)))

    return cloned
  }
}

// const schema = new PrismaSchemaState()

// schema.fromString(testSchema)

// const userModel = schema.model('User')

// userModel.field('email')!.setName('emailUpdate')
// userModel.setName('UserUpdate')
// userModel.setName('UserUpdate2')
