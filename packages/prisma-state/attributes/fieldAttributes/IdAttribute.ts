import { ScalarField } from '../../fields'
import { FieldAttribute } from '../FieldAttribute'

export class IdAttribute extends FieldAttribute<
  ScalarField,
  'map' | 'length' | 'sort' | 'clustered'
> {
  constructor(field: ScalarField) {
    super('id', field)
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
}
