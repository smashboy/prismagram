export class Field {
  name: string
  protected readonly _lineIndex: string

  constructor(name: string, lineIndex: string) {
    this.name = name
    this._lineIndex = lineIndex
  }

  _toString(): string {
    return ''
  }
}
