import { Assignment, Func } from '@mrleebo/prisma-ast'
import { EnvValue } from '@shared/common/models/Prisma'

export const cleanupAssignmentValue = (value: string) => value.replace(/"/g, '')

export const extractAssignmentValue = ({ value: assignmentValue }: Assignment): EnvValue => {
  const value = cleanupAssignmentValue(
    (typeof assignmentValue === 'string'
      ? assignmentValue
      : (assignmentValue as Func).params[0] || '') as string
  )

  const isEnv = !(typeof assignmentValue === 'string')

  return {
    value,
    isEnv
  }
}
