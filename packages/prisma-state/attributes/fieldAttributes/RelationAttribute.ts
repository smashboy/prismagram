import { AttributeArgument as AstAttributeArgument } from '@mrleebo/prisma-ast/src/getSchema'
import { ReferentialActionOption } from '../../constants'
import { RelationField } from '../../fields'
import { FieldAttribute } from '../FieldAttribute'

export class RelationAttribute extends FieldAttribute<
  RelationField,
  'name' | 'fields' | 'references' | 'map' | 'onUpdate' | 'onDelete'
> {
  constructor(field: RelationField, inialValues?: Map<string, unknown>) {
    super('relation', field, inialValues)
  }

  get name() {
    return (this.argumentsMap.get('name') as string) || null
  }

  get fields() {
    return (this.argumentsMap.get('fields') as string[]) || []
  }

  get references() {
    return (this.argumentsMap.get('references') as string[]) || []
  }

  get map() {
    return (this.argumentsMap.get('map') as string) || null
  }

  get onUpdate() {
    return (this.argumentsMap.get('onUpdate') as ReferentialActionOption) || null
  }

  get onDelete() {
    return (this.argumentsMap.get('onDelete') as ReferentialActionOption) || null
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
