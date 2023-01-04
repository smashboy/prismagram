import { FieldAttribute } from '../FieldAttribute'

export type IdAttributeArgument = 'map' | 'length' | 'sort' | 'clustered'

export class IdAttribute extends FieldAttribute<IdAttributeArgument> {
  constructor() {
    super('id')
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
