import dagre from "dagre";
import { Edge, Node } from "reactflow";
import { PrismaSchema } from "../prisma/schemaParser";

const NODE_WIDTH = 150;
const NODE_HEIGHT = 400;

export const generateGraph = (
  schema: PrismaSchema
): { nodes: Node[]; edges: Edge[] } => {
  const graph = new dagre.graphlib.Graph();

  graph.setGraph({});
  graph.setDefaultEdgeLabel(function () {
    return {};
  });

  for (const { name } of Object.values(schema.models)) {
    graph.setNode(name, {
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
    });
  }

  for (const { from, to } of Object.values(schema.relations)) {
    graph.setEdge(from, to);
  }

  dagre.layout(graph, {
    rankdir: "LR",
  });

  const nodes: Node[] = graph.nodes().map((n) => {
    const { x, y } = graph.node(n);

    return {
      id: n,
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
      position: { x, y },
      data: { label: n },
      draggable: true,
    };
  });

  const edges: Edge[] = Object.entries(schema.relations).map(
    ([id, { from, to }]) => ({
      id,
      type: "step",
      label: id,
      source: from,
      target: to,
    })
  );

  return {
    nodes,
    edges,
  };
};
