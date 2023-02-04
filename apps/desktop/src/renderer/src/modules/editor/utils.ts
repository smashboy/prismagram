import { Node, ReactFlowInstance } from 'reactflow'

export const zoomToNode = (flow: ReactFlowInstance, node: Node) =>
  flow.setCenter(
    node.position.x + (node.width || 0) / 2,
    node.position.y + (node.height || 0) / 2,
    { duration: 1000 }
  )
