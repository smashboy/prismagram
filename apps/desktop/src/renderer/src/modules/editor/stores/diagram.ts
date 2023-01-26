import { createEvent, createStore } from 'effector'
import { Diagram, Node } from '@shared/common/models/Diagram'
import { RelationType, RelationTypeOption } from 'prisma-state/constants'

export const loadDiagramEvent = createEvent<Diagram>()
export const nodesChangeEvent = createEvent<Node[]>()
export const setSelectedRelationTypeEvent = createEvent<RelationTypeOption>()

export const $diagram = createStore<Diagram | null>(null)
  .on(loadDiagramEvent, (_, diagram) => diagram)
  .on(nodesChangeEvent, (diagram, nodes) => ({
    ...diagram!,
    nodes: nodes.reduce((acc, node) => ({ ...acc, [node.id]: node }), {})
  }))

export const $nodesIds = $diagram.map((diagram) => (diagram ? Object.keys(diagram.nodes) : []))

export const $nodesColors = $diagram.map((diagram) => diagram?.nodesColors || {})

export const $nodesArray = $diagram.map((diagram) => (diagram ? Object.values(diagram.nodes) : []))

export const $edgesArray = $diagram.map((diagram) => (diagram ? Object.values(diagram.edges) : []))

export const $selectedRelationType = createStore<RelationTypeOption>(RelationType.ONE_TO_MANY).on(
  setSelectedRelationTypeEvent,
  (_, type) => type
)
