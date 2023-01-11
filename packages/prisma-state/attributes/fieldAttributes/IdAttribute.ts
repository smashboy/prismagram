import { ScalarField } from '../../fields'
import { FieldAttribute } from '../FieldAttribute'

export class IdAttribute extends FieldAttribute<
  ScalarField,
  'map' | 'length' | 'sort' | 'clustered'
> {
  constructor(field: ScalarField) {
    super('id', field)
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
