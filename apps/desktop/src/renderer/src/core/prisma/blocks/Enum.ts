import { Block } from './Block'

export class Enum extends Block<any> {
  constructor(id: string) {
    super(id, 'enum')
  }

  _parseLine(line: string) {}
}
