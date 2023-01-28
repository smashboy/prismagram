import dagre from 'dagre'
import { DiagramLayout } from '@shared/common/configs/diagrams'
import { Diagram } from '@shared/common/models/Diagram'
import { graphDirectionOption } from '../constants'

export const layoutDiagramElements = (diagram: Diagram, layout: DiagramLayout): Diagram => {
  const { nodes, edges, ...other } = diagram

  const dagreGraph = new dagre.graphlib.Graph()
  dagreGraph.setDefaultEdgeLabel(() => ({}))

  dagreGraph.setGraph({ rankdir: graphDirectionOption[layout], nodesep: 50, ranksep: 100 })

  const nodesArray = Object.entries(nodes)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nodesArray.forEach(([_, node]) => {
    dagreGraph.setNode(node.id, {
      width: node.width,
      height: node.height
    })
  })

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  dagre.layout(dagreGraph)

  const nodesWithLayout = nodesArray.reduce((acc, [id, node]) => {
    const nodeWithPosition = dagreGraph.node(id)

    node.position = {
      x: nodeWithPosition.x,
      y: nodeWithPosition.y
    }

    return { ...acc, [id]: node }
  }, {})

  return { edges, nodes: nodesWithLayout, ...other }
}
