import { attributeFunctionOptions } from '../constants'
import { stripValue } from '../utils/line'
import { AttributeFunction, AttributeFunctionType } from './AttributeFunction'

export type AttributePrefix = '@' | '@@'

export type ArgumentValue =
  | string
  | number
  | boolean
  | Array<string | number | boolean>
  | AttributeFunction

export class Attribute<T extends string, AK = string> {
  readonly arguments = new Map<AK, ArgumentValue>()
  private readonly _prefix: AttributePrefix
  readonly type: T

  constructor(type: T, prefix: AttributePrefix) {
    this.type = type
    this._prefix = prefix
  }

  get displayAttributeType() {
    return `${this._prefix}${this.type}`
  }

  protected setArgument(key: AK, value: ArgumentValue) {
    this.arguments.set(key, value)
  }

  removeArgument(key: AK) {
    this.arguments.delete(key)
  }

  // TODO rework this method to be non recursive
  private _parseSingleArgument(arg: string) {
    if (attributeFunctionOptions.includes(arg as `${AttributeFunctionType}()`))
      return new AttributeFunction(arg.replace('(', '').replace(')', '') as AttributeFunctionType)

    if (arg.startsWith('"')) return stripValue(arg)

    if (arg.startsWith('[')) {
      const arrStr = arg.replace('[', '').replace(']', '').split(',')
      const options: Array<string | AttributeFunction> = []

      for (let str of arrStr) {
        str = str.trim()

        if (!str) continue

        options.push(this._parseSingleArgument(str))
      }

      return options
    }

    return arg
  }

  _parseArgs(str: string, firstArgName?: AK) {
    const stringargs = str.split(',')

    for (const index in stringargs) {
      const argstr = stringargs[index].trim()

      if (!argstr) continue

      const nameSeparatorIndex = argstr.indexOf(':')

      if (index === '0' && nameSeparatorIndex === -1 && firstArgName) {
        this.setArgument(firstArgName, this._parseSingleArgument(argstr))
        continue
      }

      const argName = argstr.substring(0, nameSeparatorIndex) as unknown as AK
      const argValue = argstr.substring(nameSeparatorIndex + 1, argstr.length)

      // TODO figure out why value should be trimmed
      this.setArgument(argName, this._parseSingleArgument(argValue.trim()))
    }
  }

  _toString() {
    return `${this._prefix}${this.type}${this.arguments.size > 0 ? '()' : ''}`
  }
}
