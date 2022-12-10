import { combine, createEvent, createStore } from 'effector'
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

export const $selectedModelNodeId = createStore<string | null>(null)
  .on(selectModelNodeEvent, (_, id) => id)
  .reset(resetSelectedModelEvent)

export const $selectedModelNode = combine([$diagram, $selectedModelNodeId]).map(
  ([diagram, id]) => (id && diagram && diagram.nodes[id]) || null
)

export const $nodesIds = $diagram.map((diagram) => (diagram ? Object.keys(diagram.nodes) : []))

export const $nodesColors = $diagram.map((diagram) => diagram?.nodesColors || {})

export const $nodesArray = $diagram.map((diagram) => (diagram ? Object.values(diagram.nodes) : []))

export const $edgesArray = $diagram.map((diagram) => (diagram ? Object.values(diagram.edges) : []))
