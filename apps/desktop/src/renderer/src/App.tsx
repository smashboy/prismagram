import { Group, Paper } from '@mantine/core'
import 'reactflow/dist/style.css'
import { Editor } from './modules/editor'
import { CreateProjectModal, ProjectSelectorModal } from './modules/projects'
import './transports'

function App() {
  return (
    <>
      <Group w="100%" h="100%" p="xs">
        <div style={{ width: 300 }} />
        <Paper w="100%" h="100%" shadow="md" sx={{ flex: 1 }}>
          <Editor />
        </Paper>
        <CreateProjectModal />
        <ProjectSelectorModal />
      </Group>
    </>
  )
}

export default App
