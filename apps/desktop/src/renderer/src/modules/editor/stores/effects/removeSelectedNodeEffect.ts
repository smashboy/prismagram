import { cloneSchemaState } from '@renderer/core/utils'
import { attach, combine, createEffect } from 'effector'
import { PrismaSchemaState } from 'prisma-state'
import { $schemaState } from '../schema'
import { $selectedNodeId } from '../ui'

export const removeSelectedNodeEffect = attach({
  effect: createEffect(async (props: { nodeId: string | null; state: PrismaSchemaState }) => {
    const { nodeId, state } = props

    if (!nodeId) return

    state.removeModel(nodeId)

    const updatedState = await cloneSchemaState(state)

    return updatedState.toString()
  }),
  source: combine({ nodeId: $selectedNodeId, state: $schemaState })
})
