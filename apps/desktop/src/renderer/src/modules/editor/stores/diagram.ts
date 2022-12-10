import { createEvent, createStore } from 'effector'
import { Diagram, Node } from '@shared/common/models/Diagram'

export const loadDiagramEvent = createEvent<Diagram>()
export const nodesChangeEvent = createEvent<Node[]>()
export const selectModelNodeEvent = createEvent<string>()
export const resetSelectedModelEvent = createEvent()

export const $diagram = createStore<Diagram | null>(null)
  .on(loadDiagramEvent, (_, diagram) => diagram)
  .on(nodesChangeEvent, (diagram, nodes) => ({
    ...diagram!,
    nodes: nodes.reduce((acc, node) => ({ ...acc, [node.id]: node }), {})
  }))

export const $selectedModelNode = createStore<string | null>(null)
  .on(selectModelNodeEvent, (_, id) => id)
  .reset(resetSelectedModelEvent)

export const $nodesIds = $diagram.map((diagram) => (diagram ? Object.keys(diagram.nodes) : []))

export const $nodesArray = $diagram.map((diagram) => (diagram ? Object.values(diagram.nodes) : []))

export const $edgesArray = $diagram.map((diagram) => (diagram ? Object.values(diagram.edges) : []))
