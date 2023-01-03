export class Field {
  protected name: string
  protected readonly lineIndex: number

  constructor(name: string, lineIndex: number) {
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
