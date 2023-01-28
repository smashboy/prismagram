import { AttributeArgument as AstAttributeArgument } from '@mrleebo/prisma-ast/src/getSchema'
import { ReferentialActionOption } from '../../constants'
import { RelationField } from '../../fields'
import { FieldAttribute } from '../FieldAttribute'

export class RelationAttribute extends FieldAttribute<
  RelationField,
  'name' | 'fields' | 'references' | 'map' | 'onUpdate' | 'onDelete'
> {
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

  setOnUpdate(value: ReferentialActionOption) {
    this.setArgument('onUpdate', value)
  }

  setOnDelete(value: ReferentialActionOption) {
    this.setArgument('onDelete', value)
  }

  _parseArgs(args: AstAttributeArgument[]) {
    super._parseArgs(args, 'name')
  }
}
