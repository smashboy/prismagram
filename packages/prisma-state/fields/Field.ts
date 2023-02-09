export abstract class Field {
  name: string

  constructor(name: string) {
    this.name = name
  }

  _toString(): string {
    return ''
  }
}
