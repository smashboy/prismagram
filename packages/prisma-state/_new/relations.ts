import { ScalarTypeOption } from '../constants'
import { capitalize, cleanupStr, uncapitalize } from '../utils/string'
import {
  IdBlockAttribute,
  RelationAttribute,
  UniqueAttribute,
  UniqueBlockAttribute
} from './attributes'
import { Model } from './blocks'
import { RelationField, ScalarField } from './fields'
import {
  CreateCommonRelationOptions,
  CreateManyToManyRelationOptions,
  ModelData,
  ModelFieldData,
  PrismaSchemaStateInstance,
  RelationsManagerInstance
} from './types'

export class RelationsManager implements RelationsManagerInstance {
  private readonly state: PrismaSchemaStateInstance

  constructor(state: PrismaSchemaStateInstance) {
    this.state = state
  }

  // TODO: block attributes cleanup
  removeRelationFields(modelId: string, relatedModelId: string, relationName?: string) {
    const modelData = this.state.model(modelId)

    for (const field of modelData.fields.values()) {
      if (field.type === relatedModelId) {
        const relationAttr = new RelationAttribute(field.attributes.get('relation'))

        if (relationName && relationAttr.name === relationName) {
          modelData.fields.delete(field.name)
          relationAttr.fields.forEach((fieldName) => modelData.fields.delete(fieldName))
          break
        }

        modelData.fields.delete(field.name)
        relationAttr.fields.forEach((fieldName) => modelData.fields.delete(fieldName))
        break
      }
    }
  }

  remove(firstModelId: string, secondModelId: string, relationName?: string) {
    this.removeRelationFields(firstModelId, secondModelId, relationName)
    this.removeRelationFields(secondModelId, firstModelId, relationName)
  }

  private getModelIdFields(model: ModelData) {
    const fields: ModelFieldData[] = []

    if (model.attributes.has('id')) {
      const idBlockAttr = new IdBlockAttribute(model.attributes.get('id'))

      if (idBlockAttr.fields.length > 0)
        fields.push(...idBlockAttr.fields.map((fieldName) => model.fields.get(fieldName)!))
    }

    for (const field of model.fields.values()) {
      if (field.attributes.has('id')) {
        fields.push(field)
        break
      }
    }

    return fields
  }

  private createFieldName(modelName: string, fieldName: string) {
    return `${uncapitalize(modelName)}${capitalize(fieldName)}`
  }

  private createCommonRelation(
    sourceId: string,
    targetId: string,
    options?: CreateCommonRelationOptions,
    oneToMany?: boolean
  ) {
    const sourceModel = new Model(sourceId, this.state, this.state.model(sourceId))
    const targetModel = new Model(targetId, this.state, this.state.model(targetId))

    const targetIdFields = this.getModelIdFields(targetModel)

    if (targetIdFields.length === 0) return

    const relationName = options?.name ? `"${options.name}"` : void 0

    let sourceName = uncapitalize(sourceId)
    let targetName = uncapitalize(targetId)

    if (relationName) {
      sourceName = `${sourceName}_${cleanupStr(relationName)}`
      targetName = `${targetName}_${cleanupStr(relationName)}`
    }

    const targetRelationField = new RelationField(sourceName, sourceId, targetId)
    targetRelationField.setModifier(oneToMany ? 'list' : 'optional')

    const sourceRelationField = new RelationField(targetName, targetId, sourceId)
    const sourceRelationAttr = new RelationAttribute()

    if (options?.onDelete) sourceRelationAttr.setOnDelete(options.onDelete)
    if (options?.onUpdate) sourceRelationAttr.setOnUpdate(options.onUpdate)

    if (options?.isOptional) sourceRelationField.setModifier('optional')

    if (relationName) {
      sourceRelationAttr.setName(relationName)

      const targetRelationAttr = new RelationAttribute()
      targetRelationAttr.setName(relationName)
      targetRelationField.addAttribute('relation', targetRelationAttr._data())
    }

    if (targetIdFields.length === 1) {
      const targetIdField = targetIdFields[0]
      const sourceTypeField = new ScalarField(
        this.createFieldName(targetName, targetIdField.name),
        targetIdField.type as ScalarTypeOption,
        sourceId
      )

      sourceRelationAttr.setFields([sourceTypeField.name])
      sourceRelationAttr.setReferences([targetIdField.name])

      sourceRelationField.addAttribute('relation', sourceRelationAttr._data())

      if (!oneToMany) sourceTypeField.attributes.set('unique', new UniqueAttribute()._data())
      if (options?.isOptional) sourceTypeField.setModifier('optional')

      sourceModel.addField(sourceRelationField.name, sourceRelationField._data())
      sourceModel.addField(sourceTypeField.name, sourceTypeField._data())
      targetModel.addField(targetRelationField.name, targetRelationField._data())

      return
    }

    const sourceTypeFields: ScalarField[] = []

    for (const field of targetIdFields) {
      const typeField = new ScalarField(
        this.createFieldName(targetName, field.name),
        field.type as ScalarTypeOption,
        sourceId
      )

      if (options?.isOptional) typeField.setModifier('optional')

      sourceTypeFields.push(typeField)
    }

    const sourceTypeFieldNames = sourceTypeFields.map((field) => field.name)

    sourceRelationAttr.setFields(sourceTypeFieldNames)
    sourceRelationAttr.setReferences(targetIdFields.map((field) => field.name))

    if (!oneToMany) {
      const uniqueBlockAttr = new UniqueBlockAttribute()
      uniqueBlockAttr.setFields(sourceTypeFieldNames)
      sourceModel.addAttribute('unique', uniqueBlockAttr._data())
    }

    sourceRelationField.addAttribute('relation', sourceRelationAttr._data())
    sourceTypeFields.forEach((field) => sourceModel.addField(field.name, field._data()))

    sourceModel.addField(sourceRelationField.name, sourceRelationField._data())
    targetModel.addField(targetRelationField.name, targetRelationField._data())
  }

  createOneToOneRelation(
    sourceId: string,
    targetId: string,
    options?: CreateCommonRelationOptions
  ) {
    this.createCommonRelation(sourceId, targetId, options)
  }

  createOneToManyRelation(
    sourceId: string,
    targetId: string,
    options?: CreateCommonRelationOptions
  ) {
    this.createCommonRelation(sourceId, targetId, options, true)
  }

  createManyToManyRelation(
    sourceId: string,
    targetId: string,
    options?: CreateManyToManyRelationOptions
  ) {
    const relationName = options?.name ? `"${options.name}"` : void 0

    const sourceModel = new Model(sourceId, this.state, this.state.model(sourceId))
    const targetModel = new Model(targetId, this.state, this.state.model(targetId))

    let sourceName = uncapitalize(sourceId)
    let targetName = uncapitalize(targetId)

    if (relationName && !options?.explicit) {
      sourceName = `${sourceName}_${cleanupStr(relationName)}`
      targetName = `${targetName}_${cleanupStr(relationName)}`
    }

    if (options?.explicit) {
      const relationModelName = `${sourceId}On${targetId}`
      let relationModel = new Model(relationModelName, this.state)

      this.state.createModel(relationModel.name, relationModel._data())

      this.createOneToManyRelation(relationModel.name, targetModel.name)
      this.createOneToManyRelation(relationModel.name, sourceModel.name)

      relationModel = new Model(relationModelName, this.state, this.state.model(relationModelName))

      const sourceRelationAttrFields = new RelationAttribute(
        relationModel.field(sourceName)?.attributes.get('relation')
      ).fields
      const targetRelationAttrFields = new RelationAttribute(
        relationModel.field(targetName)?.attributes.get('relation')
      ).fields

      const relationModelIdAttr = new IdBlockAttribute()
      relationModelIdAttr.setFields([...sourceRelationAttrFields, ...targetRelationAttrFields])

      relationModel.addAttribute('id', relationModelIdAttr._data())

      return
    }

    const sourceRelationField = new RelationField(targetName, targetId, sourceId)
    sourceRelationField.setModifier('list')

    const targetRelationField = new RelationField(sourceName, sourceId, targetId)
    targetRelationField.setModifier('list')

    if (relationName) {
      const relationAttr = new RelationAttribute()
      relationAttr.setName(relationName)

      sourceRelationField.addAttribute('relation', relationAttr._data())
      targetRelationField.addAttribute('relation', relationAttr._data())
    }

    sourceModel.addField(sourceRelationField.name, sourceRelationField._data())
    targetModel.addField(targetRelationField.name, targetRelationField._data())
  }
}
