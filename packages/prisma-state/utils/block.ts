import { Block, type BlockType } from '../blocks'
import { PrismaSchemaStateData } from '../PrismaSchemaState'

export const extractBlockIdsByType = (type: BlockType, state: PrismaSchemaStateData) => {
  const ids: string[] = []

  for (const block of [...state.values()]) {
    if (block.type === type) ids.push(block.blockId)
  }

  return ids
}

export const extractBlocksByType = <B extends Block>(
  type: BlockType,
  list: PrismaSchemaStateData
): Map<string, B> => {
  const blocks = new Map<string, B>()

  for (const block of [...list.values()]) {
    if (block.type === type) blocks.set(block.blockId, block)
  }

  return blocks
}
