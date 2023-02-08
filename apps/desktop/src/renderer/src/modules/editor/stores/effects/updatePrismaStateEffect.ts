import { cloneSchemaState } from '@renderer/core/utils'
import { attach, createEffect } from 'effector'
import { PrismaSchemaState } from 'prisma-state'
import { $schemaState } from '../schema'

export const updatePrismaStateEffect = attach({
  effect: createEffect(async (state: PrismaSchemaState) => {
    const cloned = await cloneSchemaState(state)

    return cloned.toString()
  }),
  source: $schemaState
})
