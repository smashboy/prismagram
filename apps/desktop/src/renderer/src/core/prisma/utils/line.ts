import { EnvValue } from '@shared/common/models/Prisma'
import { blockOptions, BlockType } from '../Block'

export const getBlockId = (line: string) =>
  line
    .split(' ')
    .filter((substr) => substr !== '' && !blockOptions.includes(substr as BlockType))[0]

export const getCommonField = (line: string) => line.split('=').map((str) => str.trim())

export const getEnvValue = (value: string): EnvValue => {
  if (value.startsWith('env')) {
    return {
      isEnv: true,
      value: stripValue(value).replace('env', '').replace('(', '').replace(')', '')
    }
  }

  return {
    isEnv: false,
    value: stripValue(value)
  }
}

export const arrayFromString = (str: string) =>
  str.replace('[', '').replace(']', '').split(',').map(stripValue)

export const stripValue = (value: string) => value.replaceAll('"', '').replaceAll("'", '').trim()
