export abstract class Field {
  name: string

  constructor(name: string) {
    this.name = name
  }

  abstract _toString(): string
}
