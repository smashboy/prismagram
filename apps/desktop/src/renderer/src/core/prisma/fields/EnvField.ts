import { stripValue } from '../utils/line'
import { Field } from './Field'

export class EnvField extends Field {
  value = ''
  isEnv = false

  constructor(name: string, lineIndex: string) {
    super(name, lineIndex)
  }

  setValue(value: string) {
    this.value = value
  }

  toggleIsEnv(isEnv?: boolean) {
    this.isEnv = isEnv ?? !this.isEnv
  }

  _parse(str: string) {
    str = stripValue(str)

    if (str.startsWith('env')) {
      this.isEnv = true
      this.value = str.replace('env', '').replace('(', '').replace(')', '')

      return
    }

    this.isEnv = false
    this.value = str
  }

  _toString() {
    return `${this.name} = ${this.isEnv ? `env("${this.value}")` : `"${this.value}"`}`
  }
}
