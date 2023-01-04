import { Attribute } from './Attribute'

export class BlockAttribute extends Attribute<string> {
  constructor(type: string) {
    super(type, '@@')
  }

  _toString() {
    return super._toString()
  }
}
