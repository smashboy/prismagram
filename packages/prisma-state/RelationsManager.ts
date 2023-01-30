import { Model } from './blocks'
// import { PrismaSchemaStateData } from './PrismaSchemaState'
import { capitalize, uncapitalize } from './utils/string'
import { ModelField, RelationField } from './fields'
import { createScalarFieldFromType } from './utils/field'
import {
  IdBlockAttribute,
  RelationAttribute,
  UniqueAttribute,
  UniqueBlockAttribute
} from './attributes'

interface CreateRelationOptions {
  name?: string
}

interface CreateManyToManyRelationOptions extends CreateRelationOptions {
  explicit?: boolean
}

export class RelationsManager {
  // private readonly state: PrismaSchemaStateData

  // constructor(state: PrismaSchemaStateData) {
  //   this.state = state
  // }

  private uncapitalizeModalsNames(source: Model, target: Model) {
    return [uncapitalize(source.name), uncapitalize(target.name)] as const
  }

  private plurifyModalsNames(sourceName: string, targetName: string) {
    return [`${sourceName}s`, `${targetName}s`]
  }

  private getModelIdFields(model: Model) {
    const fields: ModelField[] = []

    if (model.attributes.has('id')) {
      const idBlockAttribute = model.attributes.get('id') as IdBlockAttribute

      if (idBlockAttribute.arguments.has('fields')) {
        const fieldNames = idBlockAttribute.arguments.get('fields') as string[]
        fields.push(...fieldNames.map((name) => model.field(name)))
      }
    }

    for (const field of [...model.fields.values()]) {
      if (field.attributes.has('id')) {
        fields.push(field)
        break
      }
    }

    console.log(fields)

    return fields
  }

  private createFieldName(modelName: string, fieldName: string) {
    return `${uncapitalize(modelName)}${capitalize(fieldName)}`
  }

  private createCommonRelation(
    source: Model,
    target: Model,
    options?: CreateRelationOptions,
    oneToMany?: boolean
  ) {
    const [sourceName, targetName] = this.uncapitalizeModalsNames(source, target)

    const targetIdFields = this.getModelIdFields(target)

    if (targetIdFields.length === 0) return

    const targetRelationField = new RelationField(sourceName, source.name, target)
    targetRelationField.setModifier(oneToMany ? 'list' : 'optional')

    const sourceRelationField = new RelationField(targetName, target.name, source)
    const sourceRelationAttr = new RelationAttribute(sourceRelationField)

    if (targetIdFields.length === 1) {
      const targetIdField = targetIdFields[0]
      const sourceTypeField = createScalarFieldFromType(
        this.createFieldName(targetName, targetIdField.name),
        targetIdField.type,
        source
      )

      if (!sourceTypeField) return

      sourceRelationAttr.setFields([sourceTypeField.name])
      sourceRelationAttr.setReferences([targetIdField.name])

      sourceRelationField.attributes.set('relation', sourceRelationAttr)

      if (!oneToMany) sourceTypeField.attributes.set('unique', new UniqueAttribute(sourceTypeField))

      source.addField(sourceRelationField.name, sourceRelationField)
      source.addField(sourceTypeField.name, sourceTypeField)
      target.addField(targetRelationField.name, targetRelationField)

      return
    }

    const uniqueBlockAttr = new UniqueBlockAttribute(source)
    const sourceTypeFields = targetIdFields
      .map((field) =>
        createScalarFieldFromType(this.createFieldName(targetName, field.name), field.type, source)
      )
      .filter((field) => !!field)

    const sourceTypeFieldName = sourceTypeFields.map((field) => field!.name)

    sourceRelationAttr.setFields(sourceTypeFieldName)
    sourceRelationAttr.setReferences(targetIdFields.map((field) => field.name))

    uniqueBlockAttr.setFields(sourceTypeFieldName)

    if (!oneToMany) source.attributes.set('unique', uniqueBlockAttr)

    source.addField(sourceRelationField.name, sourceRelationField)
    target.addField(targetRelationField.name, targetRelationField)
    sourceTypeFields.forEach((field) => source.addField(field!.name, field!))
  }

  createOneToOneRelation(source: Model, target: Model, options?: CreateRelationOptions) {
    this.createCommonRelation(source, target, options)
  }

  createOneToManyRelation(source: Model, target: Model, options?: CreateRelationOptions) {
    this.createCommonRelation(source, target, options, true)
  }

  createManyToManyRelation(
    source: Model,
    target: Model,
    options?: CreateManyToManyRelationOptions
  ) {
    const [sourceName, targetName] = this.plurifyModalsNames(
      ...this.uncapitalizeModalsNames(source, target)
    )

    const targetRelationField = new RelationField(sourceName, source.name, target)
    targetRelationField.setModifier('list')

    const sourceRelationField = new RelationField(targetName, target.name, source)
    sourceRelationField.setModifier('list')

    target.addField(sourceName, targetRelationField)
    source.addField(targetName, sourceRelationField)
  }
}
