import { AttributeArgument as AstAttributeArgument } from '@mrleebo/prisma-ast/src/getSchema'
import { Model } from '../../blocks'
import { BlockAttribute } from '../BlockAttribute'

export class UniqueBlockAttribute extends BlockAttribute<
  Model,
  'fields' | 'name' | 'map' | 'length' | 'sort' | 'clustered'
> {
  constructor(model: Model) {
    super('unique', model)
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
    this.setArgument('map', value)
  }

  setLength(value: number) {
    this.setArgument('length', value)
  }

  setSort(value: 'Asc' | 'Desc') {
    this.setArgument('sort', value)
  }

  setClustered(value: boolean) {
    this.setArgument('clustered', value)
  }

  setFields(fields: string[]) {
    this.setArgument('fields', fields)
  }

  _parseArgs(args: AstAttributeArgument[]) {
    super._parseArgs(args, 'fields')
  }
}
