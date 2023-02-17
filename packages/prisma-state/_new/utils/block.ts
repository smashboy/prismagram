import {
  BlockType,
  DatasourceData,
  EnumData,
  GeneratorData,
  ModelData,
  PrismaSchemaStateData
} from '../types'

export const extractBlockIdsByType = (type: BlockType, state: PrismaSchemaStateData) => {
  const ids: string[] = []

  for (const block of [...state.values()]) {
    if (block.type === type) ids.push(block.name)
  }

  return ids
}

export const extractBlocksByType = <
  B extends DatasourceData | EnumData | GeneratorData | ModelData
>(
  type: BlockType,
  list: PrismaSchemaStateData
): Map<string, B> => {
  const blocks = new Map<string, B>()

  for (const block of [...list.values()]) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (block.type === type) blocks.set(block.name, block)
  }

  return blocks
}