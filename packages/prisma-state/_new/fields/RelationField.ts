import { ModelFieldBase } from './ModelFieldBase'
import { FieldAttributeData, RelationFieldData } from '../types'

export class RelationField extends ModelFieldBase<RelationFieldData> {
  constructor(
    name: string,
    type: string,
    blockId: string,
    data: RelationFieldData = {
      name,
      type,
      blockId,
      modifier: null,
      attributes: new Map(),
      isRelationField: true
    }
  ) {
    super(data)
  }

  get relationName() {
    return (
      (this.attributes.get('relation') as FieldAttributeData | undefined)?.arguments.get('name') ||
      null
    )
  }

  // get relatedModel() {
  //   return this.model.state.model(this.type)
  // }

  // get relatedField() {
  //   const relatedModelFields = (
  //     this.relatedModel ? this.relatedModel.fields : []
  //   ) as RelationField[]

  //   if (this.relationName)
  //     return relatedModelFields.find(
  //       (field) => field.type === this.type && field.relationName === this.relationName
  //     )

  //   return relatedModelFields.find((field) => field.type === this.type && !field.relationName)
  // }
}
