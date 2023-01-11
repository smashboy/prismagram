import { Block, BlockType } from 'prisma-state/blocks'
import { PrismaSchemaStateData } from 'prisma-state/PrismaSchemaState'

export const extractBlocksByType = <B extends Block>(
  type: BlockType,
  list: PrismaSchemaStateData
): Map<string, B> => {
  const blocks = new Map<string, B>()

  for (const block of [...list.values()]) {
    if (block.type === type) blocks.set(block.name, block)
  }

  return blocks
}
