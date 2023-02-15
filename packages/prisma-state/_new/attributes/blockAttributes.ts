import { AttributeArgument as AstAttributeArgument } from '@mrleebo/prisma-ast/src/getSchema'
import { BlockAttribute } from '../types'
import { parseAttributeArgs } from '../utils'

type AttrProps = Omit<BlockAttribute, '_prefix'>

const addPrefix = (props: AttrProps): BlockAttribute => ({ ...props, _prefix: '@@' })

export const ignoreBlockAttribute = (
  attrProps: AttrProps = {
    type: 'ignore',
    arguments: new Map()
  }
) => {
  const attr = addPrefix(attrProps)

  return { attr }
}

export const mapBlockAttribute = (
  attrProps: AttrProps = {
    type: 'map',
    arguments: new Map()
  }
) => {
  const attr = addPrefix(attrProps)

  const name = () => (attr.arguments.get('name') as string) || null

  const setName = (value: string) => attr.arguments.set('name', value)

  const _parseArgs = (args: AstAttributeArgument[]) => parseAttributeArgs(args, attr, 'name')

  return { attr, name, setName, _parseArgs }
}

export const idBlockAttribute = (
  attrProps: AttrProps = {
    type: 'id',
    arguments: new Map()
  }
) => {
  const attr = addPrefix(attrProps)

  const name = () => (attr.arguments.get('name') as string) || null
  const map = () => (attr.arguments.get('map') as string) || null
  const length = () => (attr.arguments.get('length') as number) || null
  const sort = () => (attr.arguments.get('sort') as 'Asc' | 'Desc') || null
  const clustered = () => (attr.arguments.get('clustered') as boolean) || null
  const fields = () => (attr.arguments.get('fields') as string[]) || []

  const _parseArgs = (args: AstAttributeArgument[]) => parseAttributeArgs(args, attr, 'fields')

  return {
    attr,
    name,
    map,
    length,
    sort,
    clustered,
    fields,
    _parseArgs
  }
}

export const indexBlockAttribute = (
  attrProps: AttrProps = {
    type: 'index',
    arguments: new Map()
  }
) => {
  const attr = addPrefix(attrProps)

  const name = () => (attr.arguments.get('name') as string) || null
  const map = () => (attr.arguments.get('map') as string) || null
  const length = () => (attr.arguments.get('length') as number) || null
  const sort = () => (attr.arguments.get('sort') as 'Asc' | 'Desc') || null
  const clustered = () => (attr.arguments.get('clustered') as boolean) || null
  const fields = () => (attr.arguments.get('fields') as string[]) || []

  const _parseArgs = (args: AstAttributeArgument[]) => parseAttributeArgs(args, attr, 'fields')

  return {
    attr,
    name,
    map,
    length,
    sort,
    clustered,
    fields,
    _parseArgs
  }
}

export const uniqueBlockAttribute = (
  attrProps: AttrProps = {
    type: 'unique',
    arguments: new Map()
  }
) => {
  const attr = addPrefix(attrProps)

  const map = () => (attr.arguments.get('map') as string) || null
  const length = () => (attr.arguments.get('length') as number) || null
  const sort = () => (attr.arguments.get('sort') as 'Asc' | 'Desc') || null
  const clustered = () => (attr.arguments.get('clustered') as boolean) || null
  const fields = () => (attr.arguments.get('fields') as string[]) || []

  const _parseArgs = (args: AstAttributeArgument[]) => parseAttributeArgs(args, attr)

  return {
    attr,
    map,
    length,
    sort,
    clustered,
    fields,
    _parseArgs
  }
}
