import { Block, BlockType } from '@renderer/core/prisma/blocks/Block'
import { PrismaSchemaStateData } from '@renderer/core/prisma/PrismaSchemaState'

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
