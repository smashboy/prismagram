import { BlockType } from '../blocks/Block'
import { PrismaSchemaStateData } from '../PrismaSchemaState'

export const extractBlockIdsByType = (type: BlockType, state: PrismaSchemaStateData) => {
  const ids: string[] = []

  for (const block of [...state.values()]) {
    if (block.type === type) ids.push(block.blockId)
  }

  return ids
}
