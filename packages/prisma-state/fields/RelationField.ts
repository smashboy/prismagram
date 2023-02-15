import { RelationAttribute } from '../attributes'
import { Model } from '../blocks'
import { ModelField } from './ModelField'

export class RelationField extends ModelField {
  constructor(name: string, type: string, model: Model) {
    super(name, type, model)
  }

  get relationName() {
    return (this.attributes.get('relation') as RelationAttribute | undefined)?.name || null
  }

  get relatedModel() {
    return this.model.state.model(this.type)
  }

  get relatedField() {
    const relatedModelFields = (
      this.relatedModel ? this.relatedModel.fields : []
    ) as RelationField[]

    if (this.relationName)
      return relatedModelFields.find(
        (field) => field.type === this.type && field.relationName === this.relationName
      )

    return relatedModelFields.find((field) => field.type === this.type && !field.relationName)
  }

  remove() {
    const attr = this.attributes.get('relation') as RelationAttribute

    const relatedModel = this.model.state.model(this.type)

    let attrName: string | null = null

    if (attr) {
      const { name } = attr

      if (name) attrName = name

      attr.fields.forEach((field) => this.model.removeField(field))
    }

    if (attrName) {
      for (const field of relatedModel.fields) {
        const relatedAttr = field.attributes.get('relation') as RelationAttribute
        if (field.type === this.model.name) {
          if (attrName && relatedAttr?.name === attrName) {
            relatedModel.removeField(field.name)
            relatedAttr.fields.forEach((field) => relatedModel.removeField(field))
          }
        }
      }

      return
    }

    for (const field of relatedModel.fields) {
      if (field.type === this.model.name) {
        const relatedAttr = field.attributes.get('relation') as RelationAttribute

        relatedModel.removeField(field.name)
        relatedAttr?.fields.forEach((field) => relatedModel.removeField(field))
      }
    }
  }

  _clone(block: Model) {
    const cloned = new RelationField(this.name, this.type, block)

    ModelField._cloneModelFieldProps(this, cloned)

    return cloned
  }
}
