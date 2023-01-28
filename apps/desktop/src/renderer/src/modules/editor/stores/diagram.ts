import { PrismaSchemaState } from 'prisma-state'
import { Viewport } from 'reactflow'
import { createEvent, createStore } from 'effector'
import { Diagram, Node } from '@shared/common/models/Diagram'
import { RelationType, RelationTypeOption } from 'prisma-state/constants'
import { prismaSchemaState2Diagram } from './utils'
import { selectProjectEvent } from '@renderer/modules/projects'

export const layoutDiagramEvent = createEvent<Diagram>()
export const prismaState2DiagramEvent = createEvent<PrismaSchemaState>()
export const nodesChangeEvent = createEvent<Node[]>()
export const setSelectedRelationTypeEvent = createEvent<RelationTypeOption>()
export const viewportChangeEvent = createEvent<Viewport>()

export const $diagram = createStore<Diagram | null>(null)
  .on(prismaState2DiagramEvent, (_, state) => prismaSchemaState2Diagram(state))
  .on(layoutDiagramEvent, (_, diagram) => diagram)
  .on(nodesChangeEvent, (diagram, nodes) => ({
    ...diagram!,
    nodes: nodes.reduce((acc, node) => ({ ...acc, [node.id]: node }), {})
  }))

export const $diagramViewport = createStore<Viewport | null>(null)
  .on(viewportChangeEvent, (_, viewport) => viewport)
  .reset(selectProjectEvent)

export const $nodesIds = $diagram.map((diagram) => (diagram ? Object.keys(diagram.nodes) : []))

export const $nodesColors = $diagram.map((diagram) => diagram?.nodesColors || {})

export const $nodesArray = $diagram.map((diagram) => (diagram ? Object.values(diagram.nodes) : []))

export const $edgesArray = $diagram.map((diagram) => (diagram ? Object.values(diagram.edges) : []))

export const $selectedRelationType = createStore<RelationTypeOption>(RelationType.ONE_TO_MANY).on(
  setSelectedRelationTypeEvent,
  (_, type) => type
)
