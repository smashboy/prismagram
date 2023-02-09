import { cloneSchemaState } from '@renderer/core/utils'
import { attach, createEffect } from 'effector'
import { PrismaSchemaState } from 'prisma-state'
import { $schemaState } from '../schema'

export const updatePrismaStateEffect = attach({
  effect: createEffect((state: PrismaSchemaState) => cloneSchemaState(state)),
  source: $schemaState
})
