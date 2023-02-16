import { AttributeArgument as AstAttributeArgument } from '@mrleebo/prisma-ast/src/getSchema'
import { ReferentialActionOption } from '../../constants'
import { FieldAttribute } from '../types'
import { parseAttributeArgs } from '../utils/parser'

type AttrProps = Omit<FieldAttribute, '_prefix'>

const addPrefix = (props: AttrProps): FieldAttribute => ({ ...props, _prefix: '@' })

export const defaultAttribute = (
  attrProps: AttrProps = {
    type: 'default',
    arguments: new Map()
  }
) => {
  const attr = addPrefix(attrProps)

  const _parseArgs = (args: AstAttributeArgument[]) => parseAttributeArgs(args, attr, 'value')

  return { attr, _parseArgs }
}

export const ignoreAttribute = (
  attrProps: AttrProps = {
    type: 'ignore',
    arguments: new Map()
  }
) => {
  const attr = addPrefix(attrProps)

  return { attr }
}

export const updatedAtAttribute = (
  attrProps: AttrProps = {
    type: 'updatedAt',
    arguments: new Map()
  }
) => {
  const attr = addPrefix(attrProps)

  return { attr }
}

export const mapAttribute = (
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

export const idAttribute = (
  attrProps: AttrProps = {
    type: 'id',
    arguments: new Map()
  }
) => {
  const attr = addPrefix(attrProps)

  const map = () => (attr.arguments.get('map') as string) || null
  const length = () => (attr.arguments.get('length') as number) || null
  const sort = () => (attr.arguments.get('sort') as 'Asc' | 'Desc') || null
  const clustered = () => (attr.arguments.get('clustered') as boolean) || null

  const setMap = (value: string) => attr.arguments.set('map', value)
  const setLength = (value: number) => attr.arguments.set('length', value)
  const setSort = (value: 'Asc' | 'Desc') => attr.arguments.set('sort', value)
  const setClustered = (value: boolean) => attr.arguments.set('clustered', value)

  const _parseArgs = (args: AstAttributeArgument[]) => parseAttributeArgs(args, attr)

  return {
    attr,
    map,
    length,
    sort,
    clustered,
    setMap,
    setLength,
    setClustered,
    setSort,
    _parseArgs
  }
}

export const relationAttribute = (
  attrProps: AttrProps = {
    type: 'relation',
    arguments: new Map()
  }
) => {
  const attr = addPrefix(attrProps)

  const name = () => (attr.arguments.get('name') as string) || null
  const fields = () => (attr.arguments.get('fields') as string[]) || []
  const references = () => (attr.arguments.get('references') as string[]) || []
  const map = () => (attr.arguments.get('map') as string) || null
  const onUpdate = () => (attr.arguments.get('onUpdate') as ReferentialActionOption) || null
  const onDelete = () => (attr.arguments.get('onDelete') as ReferentialActionOption) || null

  const setName = (value: string) => attr.arguments.set('name', value)
  const setFields = (value: string[]) => attr.arguments.set('fields', value)
  const setReferences = (value: string[]) => attr.arguments.set('references', value)
  const setMap = (value: string) => attr.arguments.set('map', value)
  const setOnUpdate = (value: ReferentialActionOption) => attr.arguments.set('onUpdate', value)
  const setOnDelete = (value: ReferentialActionOption) => attr.arguments.set('onDelete', value)
  const _parseArgs = (args: AstAttributeArgument[]) => parseAttributeArgs(args, attr, 'name')

  return {
    attr,
    name,
    fields,
    references,
    map,
    onDelete,
    onUpdate,
    setName,
    setFields,
    setReferences,
    setMap,
    setOnDelete,
    setOnUpdate,
    _parseArgs
  }
}

export const uniqueAttribute = (
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

  const setMap = (value: string) => attr.arguments.set('map', value)
  const setLength = (value: number) => attr.arguments.set('length', value)
  const setSort = (value: 'Asc' | 'Desc') => attr.arguments.set('sort', value)
  const setClustered = (value: boolean) => attr.arguments.set('clustered', value)

  const _parseArgs = (args: AstAttributeArgument[]) => parseAttributeArgs(args, attr)

  return {
    attr,
    map,
    length,
    sort,
    clustered,
    setMap,
    setLength,
    setClustered,
    setSort,
    _parseArgs
  }
}
