import { EDITOR_FORMAT_SCHEMA } from '@shared/common/configs/api'
import { PrismaSchemaState } from 'prisma-state'
import { PrismaSchemaStateInstance } from 'prisma-state/_new/types'
import { invoke } from './electron'

export const string2Color = (string: string) => {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

export const formatSchema = (schema: string) => invoke(EDITOR_FORMAT_SCHEMA, schema)

export const cloneSchemaState = async (state: PrismaSchemaState) => {
  const formatted = await formatSchema(state.toString())

  const updatedState = new PrismaSchemaState()
  updatedState.fromString(formatted)

  return updatedState
}
