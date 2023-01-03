export class Field {
  protected name: string
  protected lineIndex: number

  constructor(name: string, lineIndex: number) {
    this.name = name
    this.lineIndex = lineIndex
  }

  _toString(): string {
    return ''
  }
}
