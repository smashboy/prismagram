import {
  AttributeArgument as AstAttributeArgument,
  KeyValue
} from '@mrleebo/prisma-ast/src/getSchema'
import { AttributeFunction, AttributeFunctionType } from './AttributeFunction'

export type AttributePrefix = '@' | '@@'

export type ArgumentValue =
  | string
  | number
  | boolean
  | Array<string | number | boolean>
  | AttributeFunction

export abstract class Attribute<T extends string, AK = string> {
  protected readonly argumentsMap = new Map<AK, ArgumentValue>()
  private readonly _prefix: AttributePrefix
  readonly type: T

  constructor(type: T, prefix: AttributePrefix) {
    this.type = type
    this._prefix = prefix
  }

  get displayAttributeType() {
    return `${this._prefix}${this.type}`
  }

  get arguments() {
    return [...this.argumentsMap.values()]
  }

  protected setArgument(key: AK, value: ArgumentValue) {
    this.argumentsMap.set(key, value)
  }

  removeArgument(key: AK) {
    this.argumentsMap.delete(key)
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private _parseSingleArg(arg: AstAttributeArgument['value']) {
    // if (typeof arg === 'string') return cleanupStr(arg)

    if (typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string') return arg

    if (arg instanceof Array) return arg.map(this._parseSingleArg)

    if (arg.type === 'function') return new AttributeFunction(arg.name as AttributeFunctionType)

    if (arg.type === 'array') return arg.args.map(this._parseSingleArg)
  }

  private _parseKeyValueArg(arg: KeyValue) {
    if (arg?.type === 'keyValue') {
      const { key, value } = arg
      const parsedArg = this._parseSingleArg(value)

      if (parsedArg) return [key, parsedArg] as const

      return void 0
    }

    return void 0
  }

  _parseArgs(args: AstAttributeArgument[], firstArgName?: AK) {
    for (const index in args) {
      const arg = args[index]

      if (index === '0' && firstArgName && !(arg.value as KeyValue)?.key) {
        const parsedArg = this._parseSingleArg(arg.value)
        if (parsedArg) this.setArgument(firstArgName, parsedArg)
        continue
      }

      const parsedArg = this._parseKeyValueArg(arg.value as KeyValue)

      if (parsedArg) {
        const [name, value] = parsedArg
        this.setArgument(name as unknown as AK, value)
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  _argument2String(arg: ArgumentValue) {
    if (typeof arg === 'string' || typeof arg === 'boolean' || typeof arg === 'number') return arg
    if (arg instanceof Array) return `[${arg.map(this._argument2String).join(', ')}]`
    if (arg instanceof AttributeFunction) return arg._toString()
  }

  _toString() {
    const args: Array<[string, string]> = []

    for (const [name, arg] of [...this.argumentsMap.entries()]) {
      const strArg = this._argument2String(arg)

      if (strArg) args.push([name as unknown as string, strArg])
    }

    return `${this._prefix}${this.type}${
      this.argumentsMap.size > 0
        ? `(${args.map(([name, arg]) => `${name}: ${arg}`).join(', ')})`
        : ''
    }`
  }
}
