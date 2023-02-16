import { NodeType } from '@shared/common/configs/diagrams'
import { attach, combine, createEffect } from 'effector'
import { PrismaSchemaState } from 'prisma-state'
import { $schemaState, updatePrismaSchemaEvent } from '../schema'
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

      updatePrismaSchemaEvent()
    }
  ),
  source: combine({ node: $selectedNodeId, state: $schemaState })
})
