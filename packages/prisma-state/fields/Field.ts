import { Block } from '../blocks'

export abstract class Field {
  name: string
  protected block: Block

  constructor(name: string, block: Block) {
    this.name = name
    this.block = block
  }

  abstract _toString(): string
  abstract _clone(block: Block): Field
}
