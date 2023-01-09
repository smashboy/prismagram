import { blockOptions, BlockType } from '../blocks/Block'

export const getBlockId = (line: string) =>
  line
    .split(' ')
    .filter((substr) => substr !== '' && !blockOptions.includes(substr as BlockType))[0]

export const getCommonField = (line: string) => line.split('=').map((str) => str.trim())

export const arrayFromString = (str: string) =>
  str.replace('[', '').replace(']', '').split(',').map(stripValue)

export const stripValue = (value: string) => value.replaceAll('"', '').replaceAll("'", '').trim()

export const isBlock = (type: BlockType, line: string) => line.startsWith(type)
