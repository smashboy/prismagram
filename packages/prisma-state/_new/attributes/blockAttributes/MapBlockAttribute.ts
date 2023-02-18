import { AttributeArgument as AstAttributeArgument } from '@mrleebo/prisma-ast/src/getSchema'
import { BlockAttrProps } from '../AttributeBase'

import { BlockAttributeBase } from './BlockAttributeBase'

export class MapBlockAttribute extends BlockAttributeBase {
  constructor(data?: BlockAttrProps) {
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
