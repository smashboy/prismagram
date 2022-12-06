import { Group, MantineProvider, Paper } from '@mantine/core'
import ReactFlow, { Background, useNodesState, useEdgesState } from 'reactflow'
import { theme } from './core/theme'
import 'reactflow/dist/style.css'
import { testSchema } from './modules/prisma/testschema'
import { schemaParser } from './modules/prisma/schemaParser'

import '../src/modules/editor/editor.css'
import { generateGraph } from './modules/editor/generateGraph'

const schema = schemaParser(testSchema)

const { nodes: initNodes, edges: initEdges } = generateGraph(schema)

// invoke('prisma.get-document').then((res) => console.log(res))

function App() {
  const [nodes] = useNodesState(initNodes)
  const [edges] = useEdgesState(initEdges)

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <Group w="100%" h="100%" p="xs">
        <div style={{ width: 300 }} />
        <Paper w="100%" h="100%" shadow="md" sx={{ flex: 1 }}>
          <ReactFlow defaultNodes={nodes} defaultEdges={edges} snapToGrid>
            <Background />
          </ReactFlow>
        </Paper>
      </Group>
    </MantineProvider>
  )
}

export default App
