import { PrismaSchemaState } from 'prisma-state'
import { Viewport } from 'reactflow'
import { createEvent, createStore } from 'effector'
import { Diagram, Node } from '@shared/common/models/Diagram'
import { RelationType, RelationTypeOption } from 'prisma-state/constants'
import { prismaSchemaState2Diagram } from './utils'

export const setDiagramEvent = createEvent<Diagram>()
export const prismaState2DiagramEvent = createEvent<PrismaSchemaState>()
export const nodesChangeEvent = createEvent<Node[]>()
export const setSelectedRelationTypeEvent = createEvent<RelationTypeOption>()
export const viewportChangeEvent = createEvent<Viewport>()

export const $diagram = createStore<Diagram>({
  viewport: { x: 0, y: 0, zoom: 1 },
  nodes: {},
  edges: [],
  nodesColors: {}
})
  .on(prismaState2DiagramEvent, (diagram, state) => prismaSchemaState2Diagram(state, diagram))
  .on(setDiagramEvent, (_, diagram) => diagram)
  .on(viewportChangeEvent, (diagram, viewport) => ({ ...diagram, viewport }))
  .on(nodesChangeEvent, (diagram, nodes) => ({
    ...diagram!,
    nodes: nodes.reduce((acc, node) => ({ ...acc, [node.id]: node }), {})
  }))

export const $diagramViewport = $diagram.map((diagram) => diagram.viewport)

export const $nodesIds = $diagram.map((diagram) => Object.keys(diagram.nodes))

export const $nodesColors = $diagram.map((diagram) => diagram.nodesColors)

export const $nodesArray = $diagram.map((diagram) => Object.values(diagram.nodes))

export const $edgesArray = $diagram.map((diagram) => Object.values(diagram.edges))

export const $selectedRelationType = createStore<RelationTypeOption>(RelationType.ONE_TO_MANY).on(
  setSelectedRelationTypeEvent,
  (_, type) => type
)
