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

  get name() {
    return (this.arguments.get('name') as string) || null
  }

  get fields() {
    return (this.arguments.get('fields') as string[]) || []
  }

  get references() {
    return (this.arguments.get('references') as string[]) || []
  }

  get map() {
    return (this.arguments.get('map') as string) || null
  }

  get onUpdate() {
    return (this.arguments.get('onUpdate') as ReferentialActionOption) || null
  }

  get onDelete() {
    return (this.arguments.get('onDelete') as ReferentialActionOption) || null
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
