import { AttributeArgument as AstAttributeArgument } from '@mrleebo/prisma-ast/src/getSchema'
import { BlockAttrProps } from '../AttributeBase'
import { BlockAttributeBase } from './BlockAttributeBase'

export class UniqueBlockAttribute extends BlockAttributeBase {
  constructor(data?: BlockAttrProps) {
    super('unique', data)
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

  setMap(value: string) {
    this.arguments.set('map', value)
  }

  setLength(value: number) {
    this.arguments.set('length', value)
  }

  setSort(value: 'Asc' | 'Desc') {
    this.arguments.set('sort', value)
  }

  setClustered(value: boolean) {
    this.arguments.set('clustered', value)
  }

  setFields(fields: string[]) {
    this.arguments.set('fields', fields)
  }

  _parse(args?: AstAttributeArgument[]) {
    super._parse(args, 'fields')
  }
}
