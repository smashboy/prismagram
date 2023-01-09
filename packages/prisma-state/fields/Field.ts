export class Field {
  name: string
  protected readonly _lineIndex: string

  constructor(name: string, lineIndex: string) {
    this.name = name
    this._lineIndex = lineIndex
  }

  setName(name: string) {
    this.name = name
  }

  _toString(): string {
    return ''
  }
}
