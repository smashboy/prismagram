import { EnvValue } from '@shared/common/models/Prisma'
import { blockOptions, BlockType } from '../Block'

export const getBlockId = (line: string) =>
  line
    .split(' ')
    .filter((substr) => substr !== '' && !blockOptions.includes(substr as BlockType))[0]

export const getCommonField = (line: string) =>
  line.split(' ').filter((substr) => substr !== '' && substr !== '=')

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

export const stripValue = (value: string) => value.replaceAll('"', '').replaceAll("'", '')
