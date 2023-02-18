import { AttributeArgument as AstAttributeArgument } from '@mrleebo/prisma-ast/src/getSchema'
import { ReferentialActionOption } from '../../../constants'
import { FieldAttrProps } from '../AttributeBase'
import { FieldAttributeBase } from './FieldAttributeBase'

export class RelationAttribute extends FieldAttributeBase {
  constructor(data?: FieldAttrProps) {
    super('relation', data)
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
    this.data.arguments.set('name', value)
  }

  setFields(value: string[]) {
    this.data.arguments.set('fields', value)
  }

  setReferences(value: string[]) {
    this.data.arguments.set('references', value)
  }

  setMap(value: string) {
    this.data.arguments.set('map', value)
  }

  setOnUpdate(value: ReferentialActionOption) {
    this.data.arguments.set('onUpdate', value)
  }

  setOnDelete(value: ReferentialActionOption) {
    this.data.arguments.set('onDelete', value)
  }

  _parse(args?: AstAttributeArgument[]) {
    super._parse(args, 'name')
  }
}
