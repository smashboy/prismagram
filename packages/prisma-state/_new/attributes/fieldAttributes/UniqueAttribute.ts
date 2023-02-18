import { FieldAttrProps } from '../AttributeBase'
import { FieldAttributeBase } from './FieldAttributeBase'

export class UniqueAttribute extends FieldAttributeBase {
  constructor(data?: FieldAttrProps) {
    super('unique', data)
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
}
