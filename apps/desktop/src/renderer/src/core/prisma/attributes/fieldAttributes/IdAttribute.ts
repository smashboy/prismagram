import { ScalarField } from '../../fields/types'
import { FieldAttribute } from '../FieldAttribute'

export type IdAttributeArgument = 'map' | 'length' | 'sort' | 'clustered'

export class IdAttribute extends FieldAttribute<IdAttributeArgument, ScalarField> {
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

  _parseArgs(args: string) {}
}
