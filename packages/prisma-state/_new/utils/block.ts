import { BlockType, PrismaSchemaStateData, TopLevelBlockData } from '../types'

export const extractBlockIdsByType = (type: BlockType, state: PrismaSchemaStateData) => {
  const ids: string[] = []

  for (const block of state.values()) {
    if (block.type === type) ids.push(block.name)
  }

  return ids
}

export const extractBlocksByType = <B extends TopLevelBlockData>(
  type: BlockType,
  list: PrismaSchemaStateData
): Map<string, B> => {
  const blocks = new Map<string, B>()

  for (const block of list.values()) {
    if (block.type === type) blocks.set(block.name, block as B)
  }

  return blocks
}
