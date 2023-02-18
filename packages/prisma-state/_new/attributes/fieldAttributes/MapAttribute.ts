import { AttributeArgument as AstAttributeArgument } from '@mrleebo/prisma-ast/src/getSchema'
import { FieldAttrProps } from '../AttributeBase'
import { FieldAttributeBase } from './FieldAttributeBase'

export class MapAttribute extends FieldAttributeBase {
  constructor(data?: FieldAttrProps) {
    super('map', data)
  }

  get name() {
    return (this.arguments.get('name') as string) || null
  }

  setName(value: string) {
    this.data.arguments.set('name', value)
  }

  _parse(args?: AstAttributeArgument[]) {
    super._parse(args, 'name')
  }
}
