import { FieldBase } from './FieldBase'
import { EnvFieldData } from '../types'
import { cleanupStr } from '../../utils/string'

export class EnvField extends FieldBase<EnvFieldData> {
  constructor(
    name: string,
    blockId: string,
    data: EnvFieldData = {
      name,
      blockId,
      value: '',
      isEnv: true,
      type: 'env'
    }
  ) {
    super(data)
  }

  get value() {
    return this.data.value
  }

  get isEnv() {
    return this.data.isEnv
  }

  setValue(value: string) {
    this.data.value = value
  }

  toggleIsEnv(isEnv?: boolean) {
    this.data.isEnv = isEnv ?? !this.data.isEnv
  }

  _parse(args: string[] = []) {
    const value = args[0]
    if (value) this.data.value = cleanupStr(value)
  }

  static _toString(field: EnvFieldData) {
    return `${field.name} = ${field.isEnv ? `env("${field.value}")` : `"${field.value}"`}`
  }
}
