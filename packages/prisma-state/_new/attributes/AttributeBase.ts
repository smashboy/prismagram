import {
  AttributeArgument as AstAttributeArgument,
  KeyValue
} from '@mrleebo/prisma-ast/src/getSchema'
import {
  AttributeFunction,
  AttributeFunctionType,
  BlockAttributeData,
  BlockAttributeType,
  FieldAttributeData,
  FieldAttributeType,
  Writeable
} from '../types'

export type BlockAttrProps = Omit<BlockAttributeData, 'type'>
export type FieldAttrProps = Omit<FieldAttributeData, 'type'>
type AttributePrefix = '@' | '@@'

export abstract class AttributeBase<
  T extends BlockAttributeType | FieldAttributeType,
  DT extends BlockAttributeData | FieldAttributeData,
  DTW extends Writeable<DT> = Writeable<DT>
> {
  type: T
  private prefix: AttributePrefix
  protected data: DTW

  constructor(
    type: T,
    prefix: AttributePrefix,
    data: BlockAttrProps | FieldAttrProps = { arguments: new Map() }
  ) {
    this.type = type

    this.data = data as DTW
    this.data.type = type

    this.prefix = prefix
  }

  get displayType() {
    return `${this.prefix}${this.type}`
  }

  protected get arguments() {
    return this.data.arguments
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private _parseSingleArg(arg: AstAttributeArgument['value']) {
    if (typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string') return arg

    if (arg instanceof Array) return arg.map(this._parseSingleArg)

    if (arg.type === 'function') {
      const func: AttributeFunction = {
        type: arg.name as AttributeFunctionType,
        isAttributeFunction: true
      }

      return func
    }

    if (arg.type === 'array') return arg.args.map(this._parseSingleArg)
  }

  private _parseKeyValueArg(arg: KeyValue) {
    const { key, value } = arg
    const parsedArg = this._parseSingleArg(value)

    if (parsedArg) return [key, parsedArg] as const
  }

  _parse(args: AstAttributeArgument[] = [], firstArgName?: string) {
    for (const index in args) {
      const arg = args[index]

      if (index === '0' && firstArgName && !(arg.value as KeyValue)?.key) {
        const parsedArg = this._parseSingleArg(arg.value)
        if (parsedArg) this.arguments.set(firstArgName, parsedArg)
        continue
      }

      if ((arg?.value as KeyValue)?.type === 'keyValue') {
        const parsedArg = this._parseKeyValueArg(arg.value as KeyValue)

        if (parsedArg) {
          const [name, value] = parsedArg
          this.arguments.set(name, value)
        }
      }
    }
  }

  _data() {
    return structuredClone(this.data) as DT
  }

  static _toString(prefix: AttributePrefix, attr: BlockAttributeData | FieldAttributeData) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const _argument2String = (arg: unknown) => {
      if (typeof arg === 'string' || typeof arg === 'boolean' || typeof arg === 'number') return arg
      if (arg instanceof Array) return `[${arg.map(_argument2String).join(', ')}]`
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (arg?.isAttributeFunction) return `${arg.type}()`
    }

    const args: Array<[string, string]> = []

    for (const [name, arg] of attr.arguments.entries()) {
      const strArg = _argument2String(arg)

      if (strArg) args.push([name as unknown as string, strArg])
    }

    return `${prefix}${attr.type}${
      args.length > 0 ? `(${args.map(([name, arg]) => `${name}: ${arg}`).join(', ')})` : ''
    }`
  }

  // abstract _clone(): AttributeBase
}
