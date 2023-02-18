import { AttributeArgument as AstAttributeArgument } from '@mrleebo/prisma-ast/src/getSchema'
import { FieldAttrProps } from '../AttributeBase'
import { FieldAttributeBase } from './FieldAttributeBase'

export class DefaultAttribute extends FieldAttributeBase {
  constructor(data?: FieldAttrProps) {
    super('default', data)
  }

  _parse(args?: AstAttributeArgument[]) {
    super._parse(args, 'value')
  }
}
