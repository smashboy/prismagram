import { Group, Paper } from '@mantine/core'
import 'reactflow/dist/style.css'
import { DiagramEditor } from './modules/diagram-editor'
import { CreateProjectDialog } from './modules/projects/components/CreateProjectModal'

// invoke('prisma.get-document').then((res) => console.log(res))

function App() {
  return (
    <>
      <Group w="100%" h="100%" p="xs">
        <div style={{ width: 300 }} />
        <Paper w="100%" h="100%" shadow="md" sx={{ flex: 1 }}>
          <DiagramEditor />
        </Paper>
        <CreateProjectDialog />
      </Group>
    </>
  )
}

export default App
