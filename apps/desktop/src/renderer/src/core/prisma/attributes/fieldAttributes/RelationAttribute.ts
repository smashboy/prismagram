import { ReferentialAction } from '@shared/common/configs/prisma'
import { RelationField } from '../../fields/RelationField'
import { FieldAttribute } from '../FieldAttribute'

export type RelationAttributeArgument =
  | 'name'
  | 'fields'
  | 'references'
  | 'map'
  | 'onUpdate'
  | 'onDelete'

export class RelationAttribute extends FieldAttribute<RelationAttributeArgument, RelationField> {
  constructor(field: RelationField) {
    super('relation', field)
  }

  setName(value: string) {
    this.setArgument('name', value)
  }

  setFields(value: string[]) {
    this.setArgument('fields', value)
  }

  setReferences(value: string[]) {
    this.setArgument('references', value)
  }

  setMap(value: string) {
    this.setArgument('map', value)
  }

  setOnUpdate(value: ReferentialAction) {
    this.setArgument('onUpdate', value)
  }

  setOnDelete(value: ReferentialAction) {
    this.setArgument('onDelete', value)
  }

  _parseArgs(args: string) {
    super._parseArgs(args, 'name')
  }
}
