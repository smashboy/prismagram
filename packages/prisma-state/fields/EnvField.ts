import { Datasource, Generator } from '../blocks'
import { cleanupStr } from '../utils/string'
import { Field } from './Field'

export class EnvField extends Field {
  value = ''
  isEnv = true

  constructor(name: string, block: Datasource | Generator) {
    super(name, block)
  }

  setValue(value: string) {
    this.value = value
  }

  toggleIsEnv(isEnv?: boolean) {
    this.isEnv = isEnv ?? !this.isEnv
  }

  _parse(params: string[]) {
    const value = params[0]
    this.value = cleanupStr(value)
  }

  _toString() {
    return `${this.name} = ${this.isEnv ? `env("${this.value}")` : `"${this.value}"`}`
  }
}
