import { cloneSchemaState } from '@renderer/core/utils'
import { NodeType } from '@shared/common/configs/diagrams'
import { attach, combine, createEffect } from 'effector'
import { PrismaSchemaState } from 'prisma-state'
import { $schemaState } from '../schema'
import { $selectedNodeId, SelectedNodeData } from '../ui'

export const removeSelectedNodeEffect = attach({
  effect: createEffect(
    async (props: { node: SelectedNodeData | null; state: PrismaSchemaState }) => {
      const { node, state } = props

      if (!node) return

      if (node.type === NodeType.MODEL) {
        state.removeModel(node.nodeId)
      } else if (node.type === NodeType.ENUM) {
        state.removeEnum(node.nodeId)
      }

      const updatedState = await cloneSchemaState(state)

      return updatedState
    }
  ),
  source: combine({ node: $selectedNodeId, state: $schemaState })
})
