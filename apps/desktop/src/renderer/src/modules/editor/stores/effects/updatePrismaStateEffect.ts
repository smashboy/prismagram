import { invoke } from '@renderer/core/electron'
import { cloneSchemaState } from '@renderer/core/utils'
import { EDITOR_FORMAT_SCHEMA } from '@shared/common/configs/api'
import { attach, createEffect } from 'effector'
import { PrismaSchemaState } from 'prisma-state'
import { $schemaState } from '../schema'

export const updatePrismaStateEffect = attach({
  effect: createEffect(async (state: PrismaSchemaState) => {
    const cloned = await cloneSchemaState(state)

    return invoke(EDITOR_FORMAT_SCHEMA, cloned.toString())
  }),
  source: $schemaState
})
