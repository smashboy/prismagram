import { Block } from '@mrleebo/prisma-ast'

export const extractBlocksByType = <B = Block>(type: string, list: Block[]): Map<string, B> => {
  const blocks = new Map<string, B>()

  for (const block of list) {
    if (block.type === type) blocks.set(block.name, block)
  }

  return blocks
}
