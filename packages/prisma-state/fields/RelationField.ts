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
      this.relatedModel ? [...this.relatedModel.fields.values()] : []
    ) as RelationField[]

    if (this.relationName)
      return relatedModelFields.find(
        (field) => field.type === this.type && field.relationName === this.relationName
      )

    return relatedModelFields.find((field) => field.type === this.type && !field.relationName)
  }
}
