import { NodeType } from '@shared/common/configs/diagrams'
import { attach, combine, createEffect } from 'effector'
import { createPrismaSchemaState } from 'prisma-state/_new/state'
import { PrismaSchemaStateInstance } from 'prisma-state/_new/types'
import { $schemaState, setPrismaSchemaEvent } from '../schema'
import { $selectedNodeId, SelectedNodeData } from '../ui'

export const removeSelectedNodeEffect = attach({
  effect: createEffect(
    async (props: { node: SelectedNodeData | null; state: PrismaSchemaStateInstance }) => {
      const { node, state } = props

      if (!node) return

      if (node.type === NodeType.MODEL) {
        state.removeModel(node.nodeId)
      } else if (node.type === NodeType.ENUM) {
        state.removeEnum(node.nodeId)
      }

      setPrismaSchemaEvent(state._clone() as ReturnType<typeof createPrismaSchemaState>)
    }
  ),
  source: combine({ node: $selectedNodeId, state: $schemaState })
})
