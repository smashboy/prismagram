import { ScalarField } from '../../fields'
import { FieldAttribute } from '../FieldAttribute'

export class IdAttribute extends FieldAttribute<
  ScalarField,
  'map' | 'length' | 'sort' | 'clustered'
> {
  constructor(field: ScalarField, inialValues?: Map<string, unknown>) {
    super('id', field, inialValues)
  }

  get map() {
    return (this.argumentsMap.get('map') as string) || null
  }

  get length() {
    return (this.argumentsMap.get('length') as number) || null
  }

  get sort() {
    return (this.argumentsMap.get('sort') as 'Asc' | 'Desc') || null
  }

  get clustered() {
    return (this.argumentsMap.get('clustered') as boolean) || null
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
