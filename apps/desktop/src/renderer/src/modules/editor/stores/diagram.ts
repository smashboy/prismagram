import { createEvent, createStore } from 'effector'
import { Diagram, Node } from '@shared/common/models/Diagram'

export const loadDiagramEvent = createEvent<Diagram>()
export const nodesChangeEvent = createEvent<Node[]>()

export const $diagram = createStore<Diagram | null>(null)
  .on(loadDiagramEvent, (_, diagram) => diagram)
  .on(nodesChangeEvent, (diagram, nodes) => ({
    ...diagram!,
    nodes: nodes.reduce((acc, node) => ({ ...acc, [node.id]: node }), {})
  }))

export const $nodesArray = $diagram.map((diagram) => (diagram ? Object.values(diagram.nodes) : []))

export const $edgesArray = $diagram.map((diagram) => (diagram ? Object.values(diagram.edges) : []))
