export class Field {
  protected name: string
  protected readonly lineIndex: string

  constructor(name: string, lineIndex: string) {
    this.name = name
    this.lineIndex = lineIndex
  }

  setName(name: string) {
    this.name = name
  }

  _toString(): string {
    return ''
  }
}
