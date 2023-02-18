import { AttributeArgument as AstAttributeArgument } from '@mrleebo/prisma-ast/src/getSchema'
import { BlockAttrProps } from '../AttributeBase'
import { BlockAttributeBase } from './BlockAttributeBase'

export class IndexBlockAttribute extends BlockAttributeBase {
  constructor(data?: BlockAttrProps) {
    super('index', data)
  }

  get name() {
    return (this.arguments.get('name') as string) || null
  }

  get fields() {
    return (this.arguments.get('fields') as string[]) || []
  }

  get map() {
    return (this.arguments.get('map') as string) || null
  }

  get length() {
    return (this.arguments.get('length') as number) || null
  }

  get sort() {
    return (this.arguments.get('sort') as 'Asc' | 'Desc') || null
  }

  get clustered() {
    return (this.arguments.get('clustered') as boolean) || null
  }

  _parse(args?: AstAttributeArgument[]) {
    super._parse(args, 'fields')
  }
}
