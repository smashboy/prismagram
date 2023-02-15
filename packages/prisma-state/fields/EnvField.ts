import { Datasource, Generator } from '../blocks'
import { cleanupStr } from '../utils/string'
import { Field } from './Field'

export class EnvField extends Field {
  value: string
  isEnv: boolean

  constructor(
    name: string,
    block: Datasource | Generator,
    initialValues = { value: '', isEnv: true }
  ) {
    super(name, block)

    this.value = initialValues.value
    this.isEnv = initialValues.isEnv
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

  _clone(block: Datasource | Generator) {
    return new EnvField(this.name, block, { value: this.value, isEnv: this.isEnv })
  }
}
