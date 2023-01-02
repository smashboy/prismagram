export type BlockType = 'generator' | 'datasource' | 'model' | 'enum'

export const blockOptions: BlockType[] = ['datasource', 'enum', 'generator', 'model']

export class Block {
  readonly blockId: string
  readonly type: BlockType

  constructor(id: string, type: BlockType) {
    this.blockId = id
    this.type = type
  }

  get id(): string {
    return `${this.type}.${this.blockId}`
  }

  _deleteField<R extends Object>(field: string, record: R): R {
    return Object.entries(record).reduce(
      (acc, [key, value]) => (key === field ? acc : { ...acc, [key]: value }),
      {} as R
    )
  }
}
