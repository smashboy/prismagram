import { AttributeArgument as AstAttributeArgument, KeyValue } from '@mrleebo/prisma-ast'
import { attributeFunctionsList } from '../constants'
import { cleanupStr } from '../utils/string'
import { AttributeFunction } from './AttributeFunction'

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

  private _parseSingleArg(arg: AstAttributeArgument['value']) {
    if (typeof arg === 'string') return cleanupStr(arg)

    if (typeof arg === 'boolean' || typeof arg === 'number') return arg

    if (arg instanceof Array) return arg.map(this._parseSingleArg)

    if (arg.type === 'function' && attributeFunctionsList.includes(arg.name))
      return new AttributeFunction(arg.name)

    if (arg.type === 'array') return arg.args.map(this._parseSingleArg)
  }

  private _parseKeyValueArg(arg: KeyValue) {
    if (arg?.type === 'keyValue') {
      const { key, value } = arg
      const parsedArg = this._parseSingleArg(value)

      if (parsedArg) return [key, parsedArg] as const
    }
  }

  _parseArgs(args: AstAttributeArgument[], firstArgName?: AK) {
    for (const index in args) {
      const arg = args[index]

      if (index === '0' && firstArgName && !(arg.value as KeyValue)?.key) {
        const parsedArg = this._parseSingleArg(arg.value)
        if (parsedArg) this.setArgument(firstArgName, parsedArg)
        continue
      }

      const parsedArg = this._parseKeyValueArg(arg.value)

      if (parsedArg) {
        const [name, value] = parsedArg
        this.setArgument(name as unknown as AK, value)
      }
    }
  }

  _toString() {
    return `${this._prefix}${this.type}${this.arguments.size > 0 ? '()' : ''}`
  }
}